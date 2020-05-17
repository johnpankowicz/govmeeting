using System;
using GM.Utilities;
//using TestLibrary;
using Google.Cloud.Storage.V1;

namespace WorkflowApp2
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");

            string secrets = GMFileAccess.FindParentFolderWithName("SECRETS");
            string credentialsFilePath = @"C:\GOVMEETING\SECRETS\TranscribeAudio.json";
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", credentialsFilePath);

            StorageClient storageClient = StorageClient.Create();
        }
    }
}
