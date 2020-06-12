﻿using System;
using System.IO;
using GM.GoogleCloud;
using GM.Utilities;
using GM.ProcessRecording;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using GM.ViewModels;
using Google.Protobuf.Collections;

namespace DevelopTranscription
{
    class Program
    {
        static string videofilePath = Path.Combine(GMFileAccess.GetClientAppFolder(), @"src\assets\stubdata\ToFix.mp4");
        static string testdataFolder = Path.Combine(GMFileAccess.GetTestdataFolder(), "DevelopTranscription");
        static string audiofilePath = Path.Combine(testdataFolder, "ToFix.flac");
        static string objectName = "USA_ME_LincolnCounty_BoothbayHarbor_Selectmen_en_2017-02-15_3min.flac";
        static string responseFile = Path.Combine(testdataFolder, "response.json");
        static string newResponseFile = Path.Combine(testdataFolder, "newResponse.json");
        static string rawResponseFile = Path.Combine(testdataFolder, "rawResponse.json");
        static string fixtagviewFile = Path.Combine(testdataFolder, "ToFixTagView.json");
        static string googleCloudBucketName = "govmeeting-transcribe";

        static void Main(string[] args)
        {
            // RunFix(responseFile, newResponseFile)
            GetView(newResponseFile, fixtagviewFile);

            RepeatedField<string> phrases = new RepeatedField<string> {
                "Denise Griffin",
                "Jay Warren",
                "Wendy Wolf",
                "Russell Hoffman",
                "William Hamblen",
                "Thomas Woodin",
                "Tom Woodin",
                "Kellie Bigos",
                "Julia Latter",
            };

            TranscribeParameters transParams = new TranscribeParameters
            {
                audiofilePath = audiofilePath,
                objectName = objectName,
                GoogleCloudBucketName = googleCloudBucketName,
                useAudioFileAlreadyInCloud = true,
                language = "en",
                MinSpeakerCount = 2,
                MaxSpeakerCount = 6,
                phrases = phrases
            };

            // Clean up from last run
            File.Delete(audiofilePath);
            File.Delete(responseFile);

            //string shortVideoFile = Path.Combine(testdataFolder, "ToFix - 4min.mp4");
            //SplitRecording splitRecording = new SplitRecording();
            //splitRecording.ExtractPart(videofilePath, shortVideoFile, 60, 3 * 60);

            string shortVideoFile = videofilePath;      // original is already only 3 min.
            ExtractAudio extract = new ExtractAudio();
            extract.Extract(shortVideoFile, audiofilePath);

            GMFileAccess.SetGoogleCredentialsEnvironmentVariable();

            // Transcribe the audio file
            TranscribeAudio transcribe = new TranscribeAudio();
            TranscribeResponse response = transcribe.TranscribeAudioFile(transParams);
            string responseString = JsonConvert.SerializeObject(response, Formatting.Indented);
            File.WriteAllText(responseFile, responseString);

            // Reformat the JSON transcript to match what the fixtagview routine will use.
            ModifyTranscriptJson convert = new ModifyTranscriptJson();
            FixtagviewView fixtagview = convert.Modify(response);
            string stringValue = JsonConvert.SerializeObject(fixtagview, Formatting.Indented);
            File.WriteAllText(fixtagviewFile, stringValue);

            WriteCopyOfResponse(responseString, testdataFolder);
        }

        // Write a new copy of the response file for each run so we can compare improvements
        // in transcription. The files are: Response1.json, Response2.json
        private static void WriteCopyOfResponse(string transcript, string testdataFolder)
        {
            int x = 1;
            string next;
            do
            {
                next = Path.Combine(testdataFolder, $"Response{x++}.json");
            } while (File.Exists(next));

            File.WriteAllText(next, transcript);
        }

        static void RunFix(string responseFile, string newResponseFile)
        {
            string priorResponse = File.ReadAllText(responseFile);
            TranscribeResponse beforeFix = JsonConvert.DeserializeObject<TranscribeResponse>(priorResponse);
            TranscribeResponse afterFix = TransformResponse.FixSpeakerTags(beforeFix);
            string afterFixString = JsonConvert.SerializeObject(afterFix, Formatting.Indented);
            File.WriteAllText(newResponseFile, afterFixString);
        }

        static void GetView(string responseFile, string newResponseFile)
        {
            // Reformat the response to what the fixtagview routine will use.
            string responseString = File.ReadAllText(responseFile);
            TranscribeResponse response = JsonConvert.DeserializeObject<TranscribeResponse>(responseString);
            ModifyTranscriptJson convert = new ModifyTranscriptJson();
            FixtagviewView fixtagview = convert.Modify(response);
            string stringValue = JsonConvert.SerializeObject(fixtagview, Formatting.Indented);
            File.WriteAllText(newResponseFile, stringValue);

        }

    }
}
