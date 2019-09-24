﻿using System;
using System.IO;
using Newtonsoft.Json;

using GM.ProcessRecording;
using GM.ViewModels;
using GM.ProcessRecordings;

namespace GM.ProcessRecording_Tests
{
    public class TestProcessing
    {
        // TODO - These should come from configuration
        private string testdataPath = Environment.CurrentDirectory + @"\..\..\testdata";
        //private string datafilesPath = Environment.CurrentDirectory + @"\..\..\Datafiles";

        public void TestAll()
        {
            TestReformatOfTranscribeResponse();
            TestSplitIntoWorkSegments();
            TestSplitTranscript();
        }

        public void TestSplitTranscript()
        {
            string fixasrFile = @"C:\GOVMEETING\_SOURCECODE\src\Datafiles\USA_ME_LincolnCounty_BoothbayHarbor_Selectmen_en\2017-02-15\R3-ToBeFixed.json";
            string stringValue = File.ReadAllText(fixasrFile);
            FixasrView fixasr = JsonConvert.DeserializeObject<FixasrView>(stringValue);
            string outputFolder = @"C:\GOVMEETING\_SOURCECODE\src\Datafiles\USA_ME_LincolnCounty_BoothbayHarbor_Selectmen_en\2017-02-15\R4-FixText";
            int sectionSize = 180;
            int overlap = 5;
            int parts = 4;

            SplitTranscript st = new SplitTranscript();
            st.split(fixasr, outputFolder, sectionSize, overlap, parts);

        }
        public void TestSplitIntoWorkSegments()
        {

            //string videoFile = testdata + @"\TestMoveToCloudAndTranscribe - Copy\USA_ME_LincolnCounty_BoothbayHarbor_Selectmen_EN_2017-02-15.mp4";
            //string transcriptFile = testdata + @"\TestMoveToCloudAndTranscribe - Copy\USA_ME_LincolnCounty_BoothbayHarbor_Selectmen_EN_2017-02-15.json";

            //string outputFolder = testdata + "\\" + "TestSplitIntoWorkSegments";
            //DeleteAndCreateDirectory(outputFolder);

            string outputFolder = @"C:\GOVMEETING\_SOURCECODE\src\Datafiles\USA_ME_LincolnCounty_BoothbayHarbor_Selectmen_EN\2017-01-09";
            string videoFile = outputFolder + "\\" + "R0-Video.mp4";
            string transcriptFile = outputFolder + "\\" + "R3-ToBeFixed.json";
            int segmentSize = 180;
            int overlap = 5;

            SplitIntoWorkSegments split = new SplitIntoWorkSegments();
            split.Split(outputFolder, videoFile, transcriptFile, segmentSize, overlap);
        }

        public void TestReformatOfTranscribeResponse()
        {
            string inputFile = testdataPath + @"\USA_ME_LincolnCounty_BoothbayHarbor_Selectmen_EN_2017-02-15-rsp.json";

            string outputFolder = testdataPath + "\\" + "TestReformatOfTranscribeResponse";
            FileDataRepositories.GMFileAccess.DeleteAndCreateDirectory(outputFolder);
            string outputFile = outputFolder + @"\USA_ME_LincolnCounty_BoothbayHarbor_Selectmen_EN_2017-02-15.json";

            string stringValue = File.ReadAllText(inputFile);
            var transcript = JsonConvert.DeserializeObject<TranscribeResponse>(stringValue);

            ModifyTranscriptJson convert = new ModifyTranscriptJson();
            FixasrView fixasr = convert.Modify(transcript);

            stringValue = JsonConvert.SerializeObject(fixasr, Formatting.Indented);
            File.WriteAllText(outputFile, stringValue);
        }
    }
}