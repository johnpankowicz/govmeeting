﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GM.FileDataRepositories;
using GM.GoogleCLoud;
using Microsoft.Toolkit.Parsers.Markdown;

namespace GM.Utilities.Translate
{
    class TranslateDocs
    {
        TranslateInCloud translateInCloud;
        string folder = @"C:\GOVMEETING\_SOURCECODE\FrontEnd\ClientApp\src\assets\docs";

        List<string> allDocuments = new List<string>()
            { "overview1", "overview2", "workflow", "project-status", "setup", "design", "dev-notes", "database"};

        List<string> allLanguages = new List<string>()
            { "de", "es", "fr", "it", "fi", "ar", "sw", "zh", "pt" , "bn", "hi" };

        List<string> someDocuments = new List<string>()
            { "overview1", "setup", "dev-notes"};

        List<string> someLanguages = new List<string>()
            { "ic", "sw", "no" };

        public TranslateDocs(TranslateInCloud _translateInCloud)
        {
            translateInCloud = _translateInCloud;
        }

        public void Run(string[] args)
        {
            //string folder = args[1];
            //string language = args[2];

            // Translate all the documents to all languages
        //    TranslateDocumentsLanguages(allDocuments, allLanguages);

            // Translate all the documents to some languages
         //   TranslateDocumentsLanguages(allDocuments, someLanguages);

            // Translate some documents to all languages
            TranslateDocumentsLanguages(someDocuments, allLanguages);
        }

        private void TranslateDocumentsLanguages(List<string> documents, List<string> languages)
        {
            foreach (string language in languages)
            {
                foreach (string document in documents)
                {
                    // Translate all the documents to all languages
                    TranslateDocument(document, language, true);
                };
            }
        }

        // The purpose of deletePrior is to facilitate resuming translation if we abort and restart.
        // Normally, this is set to true, since we always delete the prior translations.
        // If we set it to false and manually delete the translations before starting,
        // then if we abort the process, we can restart it and it will only translate those
        // which haven't been done yet.
        private void TranslateDocument(string document, string language, bool deletePrior)
        {
            string file = folder + "/" + document + ".md";
            string newFile = folder + "\\TRANS\\" + language.ToUpper() + "\\" + document + ".md";

            if (File.Exists(newFile) && deletePrior)
            {
                File.Delete(newFile);
            }

            if (!File.Exists(newFile))
            {
                string contents = GMFileAccess.Readfile(file);
                var htmlContents = CommonMark.CommonMarkConverter.Convert(contents);
                //string htmlFile = file.Replace(".md", ".html");
                //File.WriteAllText(htmlFile, htmlContents);

                string translated = translateInCloud.TranslateHtml(htmlContents, language);
                //string htmlNewFile = newfile.Replace(".md", ".html");
                //File.WriteAllText(htmlNewFile, translated);

                string replaced = ReplaceSomeStrings(translated);
                File.WriteAllText(newFile, replaced);

                // Wait 10 seconds. GCP didn't like me running a close loop.
                Task.Delay(10000).Wait();
            }
        }




        // The TranslateHtml method removes most newlines from the output. This makes it difficult to check for validity.
        // We try to put back newlines in appropriate places.
        // We also replace the HTML escape sequences with the actual characters. We don't use escape sequences in the markdown.
        private string ReplaceSomeStrings(string text)
        {
            var rpls = new Dictionary<string, string>
            {
                {" ____", "\n____" },
                {" C # ", " C# "},
                {" # ", "\n# " },
                {" ## ", "\n## " },
                {" ### ", "\n### " },
                {" * ", "\n* " },
                {"&quot;", "\"" },
                {"&amp;", "&" },
                {"</tr><tr>", "</tr>\n<tr>" },
                {"\"><tr>", "\">\n<tr>" },
                {"<table", "\n<table" },
                {"</table>", "\n</table>\n" },
                {"<markdown ngPreserveWhitespaces>", "\n<markdown ngPreserveWhitespaces>\n" },
                {"</markdown>", "\n</markdown>\n" },
                {"<ul>", "\n<ul>" },
                {"</ul>", "\n</ul>" },
                {"<li>", "\n<li>" },
                {"</p>", "</p>\n" },
                {"<p>", "\n<p>" }
        };


            foreach (KeyValuePair<string, string> r in rpls)
            {
                text = text.Replace(r.Key, r.Value);
            }
            return text;
        }

        private void ParseMarkdown()
        {
            string md = "This is **Markdown**";
            MarkdownDocument document = new MarkdownDocument();
            document.Parse(md);

            // Takes note of all of the Top Level Headers.
            foreach (var element in document.Blocks)
            {
                Console.WriteLine(element.ToString());
                //if (element is HeaderBlock header)
                //{
                //    Console.WriteLine($"Header: {header.ToString()}");
                //}
            }
        }

        private void RenderMarkdown()
        {
            var result = CommonMark.CommonMarkConverter.Convert("**Hello world!**");
        }

        public void DoSomethingToAllFiles(string lang)
        {

            var files = from f in Directory.EnumerateFiles(folder)
                        where f.EndsWith("." + lang + ".md")
                        select f;
            foreach (string file in files)
            {
                if (!File.Exists(file))
                {
                    Console.WriteLine("ERROR: file does not exist: " + file);
                    continue;
                }

                string contents = GMFileAccess.Readfile(file);

                // Do something

            }
        }


    }
}