
<p><a name="Contents"></a></p>
<h1> Yaliyomo </h1>
<ul>
<li> <a href="about?id=setup#InstallTools">Weka vifaa na uwekaji wa mwamba</a> </li>
<li> <a href="about?id=setup#DevelopVsCode">Kuendeleza na VsCode</a> </li>
<li> <a href="about?id=setup#DevelopVS">Kuendeleza na Studio ya Visual</a> </li>
<li> <a href="about?id=setup#DevelopOther">Kuendeleza kwenye majukwaa mengine</a> </li>
<li> <a href="about?id=setup#Database">Hifadhidata</a> </li>
<li> <a href="about?id=setup#GoogleCloud">Jukwaa la Wingu la Google</a> </li>
<li> <a href="about?id=setup#GoogleApi">Funguo za API za Google</a> </li>
</ul><hr />
<p><a name="InstallTools"></a></p>
<h1> Weka vifaa na uwekaji wa mwamba <br/></h1>
<p> <a href="about?id=setup#Contents">[Yaliyomo]</a> </p>

<ul>
<li> Weka git. <a href="https://gitforwindows.org">Git kwa Windows</a> , <a href="https://git-scm.com/download/mac">Git kwa Mac</a> </li>
<li> Weka <a href="https://nodejs.org/en/download/">Node.js.</a> </li>
<li> Weka <a href="https://dotnet.microsoft.com/download">.Hakikisha SDK ya Core.</a> </li>
<li> Clone au upakue mradi huo kutoka <a href="https://github.com/govmeeting/govmeeting">Github.</a> Ikiwe Kuboresha mradi huo na kugeuza uma wako. </li>
</ul><hr />
<p><a name="DevelopVsCode"></a></p>
<h1> Kuendeleza na VsCode <br/></h1>
<p> <a href="about?id=setup#Contents">[Yaliyomo]</a> </p>
<h2> Sasisha VsCode </h2>
<ul>
<li> Weka <a href="https://code.visualstudio.com/download">Msimbo wa Studio ya Kuonekana</a> na uanze. </li>
<li> Sasisha viendelezi hivi kwa kutumia jopo la upanuzi upande wa kushoto: 
<ul>
<li> "Debugger ya Chrome" na Microsoft </li>
<li> "C
# kwa Visual Studio Code" na Microsoft </li>
<li> "Seva ya SQL (mssql)" na Microsoft </li>
<li> "Mti wa Todo" na Gruntfuggly - inaonyesha mistari ya TODO katika msimbo (hiari) </li>
<li> "Powershell" na Microsoft - kwa Debugging Powershell kujenga hati (hiari) </li>
</ul></li>
</ul><h2> Run ConeentApp ilio </h2>
<ul>
<li> Fungua folda ya mradi katika VsCode </li>
<li> Weka vifurushi vya NPM: 
<ul>
<li> Fungua kidirisha cha terminal katika VsCode </li>
<li> cd FrontEnd / MtejaApp </li>
<li> npm kufunga </li>
</ul></li>
<li> Complile na uendeshe MtejaApp 
<ul>
<li> npm anza </li>
</ul></li>
<li> Kwenye jopo la debug, weka usanidi wa kuzindua "Kategoria ya Wateja waApple" </li>
<li> Bonyeza F5 (Debug) au Ctrl-F5 (endesha bila kushughulikia) 
<ul>
<li> AU Fungua kivinjari kwa localhost: 4200 </li>
</ul></li>
</ul>
<p> Kwa msingi, MtejaApp atapiga huduma za huduma badala ya kupiga API ya WebApp. </p>
<h2> Run ClientApp & WebApp </h2>
<ul>
<li> Pakua folda ndogo kutoka <a href="https://drive.google.com/drive/folders/1_I8AEnMNoPud7XZ_zIYfyGbvy96b-PyN?usp=sharing">Hifadhi ya Google.</a> Watie kwenye folda ya nduguye kwenye mradi ulioitwa "TESTDATA" </li>
<li> Katika FrontEnd / ClientApp / app.module.ts, badilisha "ispServerRunning" kutoka uwongo hadi ukweli. </li>
<li> Jenga miradi: 
<ul>
<li> Ctrl-Shift-P </li>
<li> Chagua "Kazi: Run Task" </li>
<li> Chagua "build-webapp" au "Jenga Zote" </li>
</ul></li>
<li> Anzisha MtejaApp (ikiwa haijatoka tayari) 
<ul>
<li> cd FrontEnd / MtejaApp </li>
<li> npm anza </li>
</ul></li>
<li> Kwenye jopo la utatuaji, weka usanidi wa kuzindua "WebApp & ClientApp" </li>
<li> Bonyeza F5 (Debug) au Ctrl-F5 (endesha bila kushughulikia) 
<ul>
<li> Kivinjari cha Chrome kitafunguliwa na baada ya kuchelewesha kifupi, ClientApp itaonekana kwenye eneo la nyumbani: 5000. </li>
</ul></li>
</ul><h3> Vidokezo </h3>
<p> "build-webapp" huunda WebApp. </p>

<p> "Jenga Zote" huunda miradi yote. Kama programu ya kujenga-wavuti, hufunga vifurushi vya NuGet kama inahitajika. Angalia kila dirisha la terminal kwa makosa na uendesha tena ikiwa inahitajika. Kuna mdudu wa hali ya mbio katika kurejesha vifurushi vingi vya NuGet kwa njia ya kawaida. </p>

<p> Kuweka "isAspServerRunning" kama kweli, inamwambia ClientApp kupiga simu API ya WebApp badala ya huduma za stika. </p>

<p> Folda ndogo kwenye gari la Google ni za kujaribu WebApp. Faili ni za kujaribu WorkflowApp. </p>

<p> MtejaApp ni kutumiwa na seva ya tovuti. WebApp hutumia seva ya Kestrel. Lakini maombi ya Kestrel ya Wateja wa Mtandao kwa seva ya wavuti. </p>
<h2> Run WorkflowApp </h2>
<ul>
<li> Pakua faili za jaribio kutoka <a href="https://drive.google.com/drive/folders/1_I8AEnMNoPud7XZ_zIYfyGbvy96b-PyN?usp=sharing">Hifadhi ya Google.</a> </li>
<li> Kwenye jopo la utatuaji, weka usanidi wa kuzindua "WorkflowApp" </li>
<li> Bonyeza F5 (Debug) au Ctrl-F5 (endesha bila kushughulikia) </li>
</ul><h3> Vidokezo </h3>
<p> WorkflowApp inashughulikia maandishi ya maandishi na inapeana rekodi. Kuandika rekodi inahitaji <a href="about?id=setup#GoogleCloud">akaunti ya Wingu la Google.</a> </p>

<p> WorkflowApp inaunda folda ya ndugu yako kwenye folda ya mradi (na TESTDATA), inayoitwa "DATAFILES". Ndani ya DATAFILES kuna folda ndogo 3: </p>

<ul>
<li> Iliyopokelewa - Faili zozote zilizowekwa ndani ya folda hii zitashughulikiwa kiatomati. </li>
<li> Kuendeleza - Hii ina folda za kazi za kusindika. </li>
<li> Imekamilika - Faili zilizokamilishwa zimewekwa hapa. </li>
</ul>
<p> Ili kuwezesha upimaji, nakala za faili za WorkflowApp zinatoka faili kutoka TESTDATA hadi DATAFILES / KUPATA wakati unapoanza. </p>
<h3> Tengeneza rekodi mpya </h3>
<p> Kando na faili za majaribio kwenye Hifadhi ya Google, unaweza kushughulikia rekodi zako mwenyewe za mikutano: </p>

<ul>
<li> Pata rekodi katika muundo wa mp4 wa mkutano wa serikali. </li>
<li> Taja faili kama ifuatavyo: "nchi_state_county_municipality_agency_language-code_date.mp4". </li>
<li> Kwa mfano: "USA_ME_LincolnCounty_BoothbayHarbor_Selectmen_en_2017-01-09.mp4". </li>
<li> Weka faili katika "DATAFILES / TUKAIPATA" </li>
<li> Katika BackEnd / WorkflowApp / appsettings.json, weka vifaa vifuatavyo: 
<ul>
<li> "AnzishaWithTestData": uongo </li>
<li> "InahitajiManagerApproval": uongo </li>
</ul></li>
<li> Run WorkflowApp. </li>
</ul>
<p> Ikiwa una Akaunti ya Google iliyosanikishwa, itaandika rekodi. </p>
<h3> Tengeneza nakala mpya </h3>
<p> Kando na maandishi ya mtihani, unaweza pia kusindika yako mwenyewe. Faili za majaribio ni nakala kutoka kwa mikutano ya baraza la jiji la Philadelphia, PA, USA. Ili kushughulikia fomati zingine za maandishi, utahitaji kuongeza njia kwa Mchakato waTranscript_Lib. Tazama <a href="https://github.com/govmeeting/govmeeting/issues/93">Toleo
# 93</a> . Mwishowe lengo ni kuandika msimbo ambao unashughulikia kiotomati fomu zote au nyingi bila kificho maalum. </p>
<hr />
<p><a name="DevelopVS"></a></p>
<h1> Kuendeleza na Studio ya Visual <br/></h1>
<p> <a href="about?id=setup#Contents">[Yaliyomo]</a> </p>

<ul>
<li> <a href="https://visualstudio.microsoft.com/free-developer-offers/">Sasisha Toleo la Jumuiya ya Studio ya Visual</a> ya bure <a href="https://visualstudio.microsoft.com/free-developer-offers/">.</a> </li>
<li> Wakati wa usanidi, chagua mzigo wa kazi wa "ASP.NET" na ". NET desktop". </li>
<li> Weka viendelezi: (zote na Mads Kristensen) 
<ul>
<li> "Runner ya Kazi ya NPM" </li>
<li> "Amri Runner Kazi" </li>
<li> "Mhariri wa alama ya chini" </li>
</ul></li>
<li> Fungua faili ya suluhisho "govmeeting.sln" </li>
</ul><h2> Run ClientApp & WebApp </h2>
<ul>
<li> Pakua folda ndogo kutoka <a href="https://drive.google.com/drive/folders/1_I8AEnMNoPud7XZ_zIYfyGbvy96b-PyN?usp=sharing">Hifadhi ya Google.</a> Watie kwenye folda ya nduguye kwenye mradi ulioitwa "TESTDATA" </li>
<li> Katika FrontEnd / ClientApp / app.module.ts, badilisha "ispServerRunning" kutoka uwongo hadi ukweli. </li>
<li> Katika Kazi Runner Explorer 
<ul>
<li> Chagua: MtejaApp </li>
<li> endesha "sasisha" </li>
<li> kukimbia "anza" </li>
</ul></li>
<li> Weka mradi wa kuanza kwa "WebApp" </li>
<li> Bonyeza F5 (Debug) au Ctrl-F5 (endesha bila kushughulikia) </li>
<li> WebApp itaendesha na kivinjari kitafunguliwa, kinachoonyesha MtejaApp. </li>
</ul>
<p> KUMBUKA: Kuna suala na mipangilio ya kuweka katika ClientApp ya Watumiaji katika Studio ya Visual. Tazama: <a href="https://github.com/govmeeting/govmeeting/issues/80">Github suala
# 80</a> </p>
<h2> Run WorkflowApp </h2>
<ul>
<li> Pakua faili za jaribio kutoka Hifadhi ya Google (tazama hapo juu) </li>
<li> Fungua paneli ya ukarabati. </li>
<li> Weka mradi wa kuanza kwa "WorkflowApp" </li>
<li> Bonyeza F5 (Debug) au Ctrl-F5 (endesha bila kushughulikia) </li>
</ul>
<p> Kumbuka: Tazama maelezo ya WorkflowApp chini ya "Visual Studio Code" </p>
<hr />
<p><a name="DevelopOther"></a></p>
<h1> Kuendeleza na zana zingine <br/></h1>
<p> <a href="about?id=setup#Contents">[Yaliyomo]</a> </p>

<p> Katika wasifu wako, weka mazingira ya kutofautisha, ASPNETCORE_ENVIRONMENT, kwa "Maendeleo". Hii inatumiwa na WebApp na WorkflowApp. </p>
<h2> Run ClientApp </h2>
<p> Tekeleza: </p>

<ul>
<li> cd Frontend / MtejaApp </li>
<li> npm kufunga </li>
<li> npm anza </li>
</ul>
<p> Nenda kwa localhost: 4200 kwenye kivinjari chako. Programu ya mteja itapakia. Vipengee vingine havitafanya kazi hadi WebApp itaanza. </p>
<h2> Run WebApp na MtejaApp </h2>
<p> Tekeleza: </p>

<ul>
<li> (fanya hapo juu: "Jenga & Anza Huduma ya Wateja") </li>
<li> cd ../../Backend/WebApp </li>
<li> dotnet kujenga webapp.csproj </li>
<li> dotnet kukimbia bin / debug / dotnet2.2 / webapp.dll </li>
</ul>
<p> Nenda kwa eneo la karibu: 5000 kwenye kivinjari chako. Programu ya mteja itapakia. </p>
<h2> Run ConeentApp ilio </h2>
<ul>
<li> Katika programu.module.ts, badilisha "ispServerRunning" kutoka kweli kwenda kwa uwongo. </li>
<li> (fanya hapo juu: "Jenga & Anza Huduma ya Wateja") </li>
</ul><h2> Run WorkflowApp </h2>
<p> Tekeleza: </p>

<ul>
<li> cd Backend / WorkflowApp </li>
<li> dotnet kujenga workflowapp.csproj </li>
<li> dotnet run bin / debug / dotnet2.0 / workflowapp.dll </li>
</ul>
<p> Kumbuka: Tazama maelezo ya WorkflowApp chini ya "Visual Studio Code" </p>
<!-- END OF README SECTION --><hr />
<p><a name="Database"></a></p>
<h1> Hifadhidata <br/></h1>
<p> <a href="about?id=setup#Contents">[Yaliyomo]</a> </p>

<p> Labda hauitaji kufunga na kusanidi hifadhidata ili ufanye maendeleo. Kuna vipimo vya jaribio ambavyo vinachukua nafasi ya kupiga database. Angalia "Vijiti vya Mtihani" hapo chini. </p>
<h2> Weka Mtoaji </h2>
<p> Ikiwa unatumia Studio ya Visual au Msimbo wa Visual Visual, mtoaji wa Sql Server Express LocalDb tayari imewekwa. Vinginevyo fanya "Ufungaji wa Mpeana wa Mtoaji wa Db" hapo chini. </p>
<h3> Ufungaji wa Mtoaji wa Db ya Mitaa </h3>
<p> Nenda kwa <a href="https://www.microsoft.com/en-us/sql-server/sql-server-downloads">Sql Server Express.</a> Kwa Windows, pakua toleo maalum la "Express" la SQL Server. Wakati wa usanidi, chagua "Kitamaduni" na uchague "LocalDb". </p>

<p> LocalDb inapatikana pia kwa MacOs na Linux. Ikiwa utaisanikisha kwa jukwaa lolote, tafadhali sasisha hati hii na hatua na ufanye ombi la Bomba. </p>
<h3> Watoa huduma wengine </h3>
<p> Mbali na LocalSb, EF Core inasaidia <a href= "https://docs.microsoft.com/en-us/ef/core/providers/?tabs=dotnet-core-cli">watoa huduma wengine,</a> ambayo unaweza kutumia kwa maendeleo, pamoja na SqlLite. Utahitaji kurekebisha usanidi wa DbContext katika Startup.cs na kamba ya uunganisho katika vifaa vya programu.json. </p>
<h2> Kuunda Database Schema </h2>
<p> Database imejengwa kupitia sehemu ya "nambari ya kwanza" ya Core Mfumo wa Taasisi. Inachunguza madarasa ya C# kwenye mfano wa data na inaunda moja kwa moja meza na uhusiano. Kuna hatua mbili: (1) Unda msimbo wa "uhamiaji" kwa kufanya sasisho na (2) kutekeleza sasisho. </p>

<ul>
<li> cd Kusaidia / WebApp </li>
<li> uhamiaji wa dotnet kuongeza usalama - mwanzo .. \ Database \ DatabaseAccess_Lib </li>
<li> dotnet ef database sasisho - mpango .. \ Database \ DatabaseAccess_Lib </li>
</ul><h2> Chunguza hifadhidata iliyoundwa </h2><h3> Katika VsCode </h3>
<p> Ongeza yafuatayo kwa mipangilio ya mtumiaji.json katika VsCode: </p>
<pre> <code> "mssql.connections": [ { "server": "(localdb)\\mssqllocaldb", "database": "Govmeeting", "authenticationType": "Integrated", "profileName": "GMProfile", "password": "" } ],</code> </pre>
<ul>
<li> Bonyeza ctrl-alt-D au bonyeza kitufe cha Sql Server upande wa kushoto. </li>
<li> Fungua unganisho la GMProfile kutazama na kufanya kazi na vitu vya hifadhidata. </li>
<li> Fungua "Meza". Unapaswa kuona meza zote iliyoundwa wakati umeunda schema hapo juu. Hii ni pamoja na meza za AspNetxxxx za Authorizaton na meza za modeli ya data ya Govmeeting. </li>
</ul><h3> Katika Studio ya Visual </h3>
<ul>
<li> Nenda kwa bidhaa ya menyu: Angalia -&gt; SQL Sutu ya Kivinjari cha SQL. </li>
<li> Panua seva ya SQL -&gt; (localdb) \ MSSQLLocalDb -&gt; Databaka -&gt; Govmeeting </li>
<li> Fungua "Meza". Unapaswa kuona meza zote iliyoundwa wakati umeunda schema hapo juu. Hii ni pamoja na meza za AspNetxxxx za Authorizaton na meza za modeli ya data ya Govmeeting. </li>
</ul><h3> Majukwaa mengine </h3>
<p> Kuna jukwaa la msalaba na chanzo wazi cha <a href="https://github.com/Microsoft/sqlopsstudio?WT.mc_id=-blog-scottha">SQL Operations Studio,</a> "zana ya usimamizi wa data ambayo inawezesha kufanya kazi na SQL Server, Azure SQL DB na SQL DW kutoka Windows, MacOS na Linux." Unaweza kupakua <a href="https://docs.microsoft.com/en-us/sql/sql-operations-studio/download?view=sql-server-2017&WT.mc_id=-blog-scottha">SQL Operation Studio bure hapa.</a> </p>

<p> Ikiwa unatumia hii, au zana nyingine, ya kuchunguza hifadhidata za SQL Server, tafadhali sasisha maagizo haya. </p>
<h2> Vijiti vya Mtihani </h2>
<p> Nambari ya kuhifadhi / kupata data ya maandishi kwenye hifadhidata bado haijaandikwa. Kwa hivyo DatabaseRepositories_Lib hutumia data ya mtihani wa tuli badala yake. Katika WebApp / appsettings.json, mali "Matumizi ya Karatasi ya Matumizi" imewekwa kuwa "kweli", ikiambia iite simu za mara kwa mara. </p>

<p> Walakini usajili wa mtumiaji na msimbo wa kuingia katika WebApp hutumia hifadhidata. Inafikia meza za uthibitisho wa watumiaji wa Asp.Net. WebApp inathibitisha simu za API kutoka kwa WatejaApp kulingana na mtumiaji aliyeingia sasa. </p>

<p> Unaweza kutumia "NOAUTH" thamani ya processor ya mapema katika WebApp ili kupitisha uthibitishaji. Tumia moja ya njia hizi: </p>

<ul>
<li> Katika FixasrController.cs au AddtagsController.cs, un-to-comment the "#if NOAUTH" juu ya faili. </li>
<li> Ili kuizima kwa watawala wote, ongeza hii kwa WebApp.csproj: </li>
</ul><pre> <code> &lt;PropertyGroup Condition="&#39;$(Configuration)|$(Platform)&#39;==&#39;Debug|AnyCPU&#39;&gt; &lt;DefineConstants&gt;NOAUTH&lt;/DefineConstants&gt; &lt;/PropertyGroup&gt;</code> </pre>
<ul>
<li> Katika Studio ya Visual, nenda kwenye kurasa za mali za Wavuti -&gt; Jenga -&gt; na ingiza NOAUTH katika sanduku la "Dalili za Ushirikiano wa masharti". </li>
</ul><hr />
<p><a name="GoogleCloud"></a></p>
<h1> Jukwaa la Wingu la Google <br/></h1>
<p> <a href="about?id=setup#Contents">[Yaliyomo]</a> </p>

<p> Ili kutumia API ya Google Hotuba kwa uongofu wa maandishi na maandishi, unahitaji akaunti ya Wingu la Google Cloud (GCP). Kwa kazi nyingi za maendeleo katika Govmeeting, unaweza kutumia data iliyopo ya mtihani. Lakini ikiwa unataka kuandika rekodi mpya, utakuwa GCP. Google API ina uwezo wa kuandika rekodi katika lugha zaidi ya 120 na anuwai. </p>

<p> Google hutoa watengenezaji na akaunti ya bure ambayo ni pamoja na mkopo (sasa $ 300). Gharama ya sasa ya kutumia API ya Hotuba ni bure kwa ubadilishaji wa dakika 60 kwa mwezi. Baada ya hayo, gharama ya "mfano ulioimarishwa" (ambayo ndio tunayohitaji) ni $ 0.009 kwa sekunde 15. ($ 2.16 kwa saa) </p>

<ul>
<li>
<p> Fungua akaunti na <a href="https://cloud.google.com/free/">Jukwaa la Wingu la Google</a> </p>
</li>
<li>
<p> Nenda kwa <a href="http://console.cloud.google.com">Dashibodi ya Wingu</a> la <a href="http://console.cloud.google.com">Google</a> na uunda mradi. </p>
</li>
<li>
<p> Nenda kwenye <a href="http://console.developers.google.com">Daraja la Wasanidi Programu wa Google</a> na uwezeshe API ya Uhifadhi wa Hotuba na Wingu </p>
</li>
<li>
<p> Tengeneza uthibitishaji wa "akaunti ya huduma" kwa mradi huu. Bonyeza juu ya Uhakiki katika koni ya msanidi programu. </p>
</li>
<li>
<p> Toa ruhusa za "Mhariri" wa akaunti hii kwenye mradi huo. Bonyeza kwenye akaunti. Kwenye ukurasa unaofuata, bonyeza Ruhusa. </p>
</li>
<li>
<p> Pakua faili ya JSON ya kuaminika. </p>
</li>
<li>
<p> Unda folda ya <code>SECRETS</code> kama ndugu kwa folda ya mradi iliyoshonwa </p>
</li>
<li>
<p> Weka faili ya kuaminika katika SECRETS na uitie tena jina la <code>TranscribeAudio.json</code> . </p>
</li>
</ul><h2> Hotuba ya Mtihani kwa maandishi ya maandishi </h2>
<ul>
<li>
<p> Weka mradi wa kuanzisha katika Studio ya Visual <code>Backend/WorkflowApp</code> . Bonyeza F5. </p>
</li>
<li>
<p> Nakili (usisonge) moja ya faili za mfano za MP4 kutoka testdata hadi DATAFILES / RECEIVED. </p>
</li>
</ul>
<p> Programu hiyo sasa itatambua kuwa faili mpya imeonekana na kuanza kusindika. Faili ya MP4 itahamishwa kwenda "KULELETWA" itakapomalizika. Utaona matokeo katika sufolders, ambazo ziliundwa katika saraka ya "DATAFILES". </p>

<p> Katika vifaa vya ujenzi.json, kuna mali "RecordingSizeForDevelopment". Imewekwa kwa "180". Hii husababisha utaratibu wa uandishi katika Mchakato waRekodi_Lib kusindika sekunde 180 za kwanza za rekodi. </p>
<hr />
<p><a name="GoogleApi"></a></p>
<h1> Funguo za API za Google <br/></h1>
<p> <a href="about?id=setup#Contents">[Yaliyomo]</a> </p>

<p> Utahitaji funguo hizi ikiwa unataka kutumia au kufanya kazi kwenye huduma fulani za mchakato wa usajili na kuingia. </p>

<ul>
<li> Funguo za ReCaptcha zinahitajika kutumia ReCaptcha wakati wa usajili wa mtumiaji. Wanaweza kupatikana kwenye <a href="https://developers.google.com/recaptcha/">reCaptcha</a> ya <a href="https://developers.google.com/recaptcha/">Google</a> . </li>
<li> Uthibitishaji wa OAuth 2.0 hutumiwa kufanya kuingia kwa mtumiaji wa nje bila hitaji la mtumiaji kuunda akaunti ya kibinafsi kwenye wavuti. Tembelea <a href="https://console.developers.google.com/">Dashibodi</a> ya <a href="https://console.developers.google.com/">Google API</a> kupata hati kama Kitambulisho cha mteja na siri ya mteja. </li>
</ul>
<p> Unda folda ya <code>SECRETS</code> kama ndugu kwa folda ya mradi iliyoshonwa. Unda faili ndani yake inayoitwa "appsettings.Development.json", na muundo ufuatao. </p>
<pre> <code>{ "ExternalAuth": { "Google": { "ClientId": "your-client-Id", "ClientSecret": "your-client-secret" } }, "ReCaptcha:SiteKey": "your-site-key", "ReCaptcha:Secret": "your-secret" }</code> </pre>
<p> Badilishe ili iwe na funguo ambazo umepata tu: </p>
<hr /><h2> Jaribu reCaptcha </h2>
<ul>
<li> Endesha mradi wa WebApp. </li>
<li> Bonyeza kwa "Sajili" katika haki ya juu. </li>
<li> Chaguo la reCaptcha linapaswa kuonekana. </li>
</ul><hr /><h2> Jaribu Uthibitishaji wa Google </h2>
<ul>
<li> Endesha mradi wa WebApp. </li>
<li> Bonyeza "Ingia" katika haki ya juu. </li>
<li> Chini ya "Tumia huduma nyingine kuingia", chagua "Google". </li>
</ul>