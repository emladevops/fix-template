import sys
import os
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = "auth.json"
#os.system("export GOOGLE_APPLICATION_CREDENTIALS=/home/nodejs/auth.json")
def transcribe_file(speech_file):
    """Transcribe the given audio file asynchronously."""
    from google.cloud import speech

    client = speech.SpeechClient()
    
    with open(speech_file, "rb") as audio_file:
        content = audio_file.read()

    """
     Note that transcription is limited to a 60 seconds audio file.
     Use a GCS file for audio longer than 1 minute.
    """
    audio = speech.RecognitionAudio(content=content)

    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.FLAC,
        sample_rate_hertz=44100,
        language_code="vi-VN",
    )


    operation = client.long_running_recognize(config=config, audio=audio)
    response = operation.result(timeout=90)

    # Each result is for a consecutive portion of the audio. Iterate through
    # them to get the transcripts for the entire audio file.
    for result in response.results:
        # The first alternative is the most likely one for this portion.
        print(format(result.alternatives[0].transcript))
       

filePath = sys.argv
uniqueId = sys.argv[1]
transcribe_file(str(uniqueId))
