
<p><a name="Contents"></a></p>
<h1> Contenuti </h1>
<ul>
<li> <a href="about?id=setup#InstallTools">Installa strumenti e clone repository</a> </li>
<li> <a href="about?id=setup#DevelopVsCode">Sviluppa con VsCode</a> </li>
<li> <a href="about?id=setup#DevelopVS">Sviluppa con Visual Studio</a> </li>
<li> <a href="about?id=setup#DevelopOther">Sviluppa su altre piattaforme</a> </li>
<li> <a href="about?id=setup#Database">Banca dati</a> </li>
<li> <a href="about?id=setup#GoogleCloud">Google Cloud Platform</a> </li>
<li> <a href="about?id=setup#GoogleApi">Chiavi API di Google</a> </li>
</ul><hr />
<p><a name="InstallTools"></a></p>
<h1> Installa strumenti e clone repository <br/></h1>
<p> <a href="about?id=setup#Contents">[Contenuti]</a> </p>

<ul>
<li> Installa git. <a href="https://gitforwindows.org">Git per Windows</a> , <a href="https://git-scm.com/download/mac">Git per Mac</a> </li>
<li> Installa <a href="https://nodejs.org/en/download/">Node.js.</a> </li>
<li> Installa <a href="https://dotnet.microsoft.com/download">.Net Core SDK.</a> </li>
<li> Clona o scarica il progetto da <a href="https://github.com/govmeeting/govmeeting">Github.</a> Preferibilmente fork il progetto e clonare la forcella. </li>
</ul><hr />
<p><a name="DevelopVsCode"></a></p>
<h1> Sviluppa con VsCode <br/></h1>
<p> <a href="about?id=setup#Contents">[Contenuti]</a> </p>
<h2> Installa VsCode </h2>
<ul>
<li> Installa <a href="https://code.visualstudio.com/download">Visual Studio Code</a> e avvialo. </li>
<li> Installa queste estensioni utilizzando il pannello delle estensioni a sinistra: 
<ul>
<li> "Debugger per Chrome" di Microsoft </li>
<li> "C
# per Visual Studio Code" di Microsoft </li>
<li> "SQL Server (mssql)" di Microsoft </li>
<li> "Todo Tree" di Gruntfuggly - mostra le linee TODO nel codice (opzionale) </li>
<li> "Powershell" di Microsoft - per il debug degli script di build di Powershell (opzionale) </li>
</ul></li>
</ul><h2> Esegui ClientApp standalone </h2>
<ul>
<li> Apri la cartella del progetto in VsCode </li>
<li> Installa i pacchetti NPM: 
<ul>
<li> Aprire un riquadro terminale in VsCode </li>
<li> cd FrontEnd / ClientApp </li>
<li> npm install </li>
</ul></li>
<li> Complili ed esegui ClientApp 
<ul>
<li> inizio npm </li>
</ul></li>
<li> Nel pannello di debug, imposta la configurazione di avvio "ClientApp Standalone" </li>
<li> Premi F5 (debug) o Ctrl-F5 (esegui senza debug) 
<ul>
<li> OPPURE aprire un browser su localhost: 4200 </li>
</ul></li>
</ul>
<p> Per impostazione predefinita, ClientApp chiamerà i servizi di stub invece di chiamare l&#39;API WebApp. </p>
<h2> Esegui ClientApp e WebApp </h2>
<ul>
<li> Scarica le sottocartelle da <a href="https://drive.google.com/drive/folders/1_I8AEnMNoPud7XZ_zIYfyGbvy96b-PyN?usp=sharing">Google Drive.</a> Inseriscili in una cartella di pari livello nel progetto denominato "TESTDATA" </li>
<li> In FrontEnd / ClientApp / app.module.ts, modifica "isAspServerRunning" da false a true. </li>
<li> Costruire progetti: 
<ul>
<li> Ctrl-Shift-P </li>
<li> Seleziona "Attività: Esegui attività" </li>
<li> Seleziona "build-webapp" o "Build All" </li>
</ul></li>
<li> Avvia ClientApp (se non è già in esecuzione) 
<ul>
<li> cd FrontEnd / ClientApp </li>
<li> inizio npm </li>
</ul></li>
<li> Nel pannello di debug, imposta la configurazione di avvio "WebApp & ClientApp" </li>
<li> Premi F5 (debug) o Ctrl-F5 (esegui senza debug) 
<ul>
<li> Il browser Chrome si aprirà e dopo un breve ritardo, ClientApp apparirà su localhost: 5000. </li>
</ul></li>
</ul><h3> Appunti </h3>
<p> "build-webapp" crea WebApp. </p>

<p> "Build All" crea tutti i progetti. Come build-webapp, installa i pacchetti NuGet secondo necessità. Verificare la presenza di errori in ogni finestra del terminale e, se necessario, rieseguire. Esiste un bug noto relativo alla race condition nel ripristino in modalità asincrona di più pacchetti NuGet. </p>

<p> Impostando "isAspServerRunning" su true, viene indicato a ClientApp di chiamare l&#39;API WebApp anziché i servizi di stub. </p>

<p> Le sottocartelle su Google Drive servono per testare WebApp. I file sono per il test di WorkflowApp. </p>

<p> ClientApp è fornita dal webpack-dev-server. WebApp utilizza il server Kestrel. Ma Kestrel inoltra le richieste di ClientApp al webpack-dev-server. </p>
<h2> Esegui WorkflowApp </h2>
<ul>
<li> Scarica i file di prova da <a href="https://drive.google.com/drive/folders/1_I8AEnMNoPud7XZ_zIYfyGbvy96b-PyN?usp=sharing">Google Drive.</a> </li>
<li> Nel pannello di debug, imposta la configurazione di avvio "WorkflowApp" </li>
<li> Premi F5 (debug) o Ctrl-F5 (esegui senza debug) </li>
</ul><h3> Appunti </h3>
<p> WorkflowApp elabora testi trascritti e trascrive registrazioni. La trascrizione delle registrazioni richiede un <a href="about?id=setup#GoogleCloud">account Google Cloud.</a> </p>

<p> WorkflowApp crea una cartella di pari livello nella cartella del progetto (e TESTDATA), denominata "DATAFILES". All&#39;interno di DATAFILES ci sono 3 sottocartelle: </p>

<ul>
<li> RICEVUTO - Tutti i file inseriti in questa cartella verranno elaborati automaticamente. </li>
<li> ELABORAZIONE - Questo contiene cartelle di lavoro per l&#39;elaborazione. </li>
<li> COMPLETATO - I file completati vengono inseriti qui. </li>
</ul>
<p> Per facilitare il test, WorkflowApp copia i file da TESTDATA a DATAFILES / RECEIVED all&#39;avvio. </p>
<h3> Elabora nuove registrazioni </h3>
<p> Oltre ai file di test su Google Drive, puoi elaborare le tue registrazioni delle riunioni: </p>

<ul>
<li> Ottieni una registrazione in formato mp4 di una riunione del governo. </li>
<li> Denominare il file come segue: "country_state_county_m townsality_agency_language-code_date.mp4". </li>
<li> Ad esempio: "USA_ME_LincolnCounty_BoothbayHarbor_Selectmen_en_2017-01-09.mp4". </li>
<li> Inserisci il file in "DATAFILES / RECEIVED" </li>
<li> In BackEnd / WorkflowApp / appsettings.json, imposta le seguenti proprietà: 
<ul>
<li> "InitializeWithTestData": false </li>
<li> "RequireManagerApproval": false </li>
</ul></li>
<li> Esegui WorkflowApp. </li>
</ul>
<p> Se hai impostato un account Google, trascriverà la registrazione. </p>
<h3> Elabora nuove trascrizioni </h3>
<p> Oltre alle trascrizioni di prova, puoi anche elaborare le tue. I file di prova sono trascrizioni delle riunioni del consiglio comunale di Filadelfia, Pennsylvania, USA. Per gestire altri formati di trascrizione, dovrai aggiungere un metodo a ProcessTranscript_Lib. Vedi <a href="https://github.com/govmeeting/govmeeting/issues/93">numero 93</a> . Alla fine l&#39;obiettivo è quello di scrivere codice che gestisca automaticamente tutti o la maggior parte dei formati senza codice personalizzato. </p>
<hr />
<p><a name="DevelopVS"></a></p>
<h1> Sviluppa con Visual Studio <br/></h1>
<p> <a href="about?id=setup#Contents">[Contenuti]</a> </p>

<ul>
<li> Installa <a href="https://visualstudio.microsoft.com/free-developer-offers/">Visual Studio Community Edition</a> gratuito <a href="https://visualstudio.microsoft.com/free-developer-offers/">.</a> </li>
<li> Durante l&#39;installazione, selezionare i carichi di lavoro "ASP.NET" e "Desktop .NET". </li>
<li> Installa estensioni: (tutto di Mads Kristensen) 
<ul>
<li> "Task Runner NPM" </li>
<li> "Comando Task Runner" </li>
<li> "Markdown Editor" </li>
</ul></li>
<li> Apri il file della soluzione "govmeeting.sln" </li>
</ul><h2> Esegui ClientApp e WebApp </h2>
<ul>
<li> Scarica le sottocartelle da <a href="https://drive.google.com/drive/folders/1_I8AEnMNoPud7XZ_zIYfyGbvy96b-PyN?usp=sharing">Google Drive.</a> Inseriscili in una cartella di pari livello nel progetto denominato "TESTDATA" </li>
<li> In FrontEnd / ClientApp / app.module.ts, modifica "isAspServerRunning" da false a true. </li>
<li> In Task Runner Explorer 
<ul>
<li> Seleziona: ClientApp </li>
<li> esegui "installa" </li>
<li> eseguire "start" </li>
</ul></li>
<li> Imposta il progetto di avvio su "WebApp" </li>
<li> Premi F5 (debug) o Ctrl-F5 (esegui senza debug) </li>
<li> WebApp verrà eseguito e verrà aperto un browser che visualizza ClientApp. </li>
</ul>
<p> NOTA: si è verificato un problema con l&#39;impostazione dei punti di interruzione in Angular ClientApp in Visual Studio. Vedi: <a href="https://github.com/govmeeting/govmeeting/issues/80">Github numero 80</a> </p>
<h2> Esegui WorkflowApp </h2>
<ul>
<li> Scarica i file di test da Google Drive (vedi sopra) </li>
<li> Apri il pannello di debug. </li>
<li> Imposta il progetto di avvio su "WorkflowApp" </li>
<li> Premi F5 (debug) o Ctrl-F5 (esegui senza debug) </li>
</ul>
<p> Nota: vedere le note per WorkflowApp in "Codice di Visual Studio" </p>
<hr />
<p><a name="DevelopOther"></a></p>
<h1> Sviluppa con altri strumenti <br/></h1>
<p> <a href="about?id=setup#Contents">[Contenuti]</a> </p>

<p> Nel tuo profilo, imposta la variabile di ambiente, ASPNETCORE_ENVIRONMENT, su "Sviluppo". Questo è usato da WebApp e WorkflowApp. </p>
<h2> Esegui ClientApp </h2>
<p> Eseguire: </p>

<ul>
<li> cd Frontend / ClientApp </li>
<li> npm install </li>
<li> inizio npm </li>
</ul>
<p> Vai a localhost: 4200 nel tuo browser. Verrà caricata l&#39;app client. Alcune funzioni non funzioneranno fino a quando WebApp non sarà in esecuzione. </p>
<h2> Esegui WebApp con ClientApp </h2>
<p> Eseguire: </p>

<ul>
<li> (fare sopra: "Crea e avvia ClientApp") </li>
<li> cd ../../Backend/WebApp </li>
<li> dotnet build webapp.csproj </li>
<li> dotnet esegui bin / debug / dotnet2.2 / webapp.dll </li>
</ul>
<p> Vai a localhost: 5000 nel tuo browser. Verrà caricata l&#39;app client. </p>
<h2> Esegui ClientApp standalone </h2>
<ul>
<li> In app.module.ts, modifica "isAspServerRunning" da true a false. </li>
<li> (fare sopra: "Crea e avvia ClientApp") </li>
</ul><h2> Esegui WorkflowApp </h2>
<p> Eseguire: </p>

<ul>
<li> cd Backend / WorkflowApp </li>
<li> dotnet build workflowapp.csproj </li>
<li> dotnet esegui bin / debug / dotnet2.0 / workflowapp.dll </li>
</ul>
<p> Nota: vedere le note per WorkflowApp in "Codice di Visual Studio" </p>
<!-- END OF README SECTION --><hr />
<p><a name="Database"></a></p>
<h1> Banca dati <br/></h1>
<p> <a href="about?id=setup#Contents">[Contenuti]</a> </p>

<p> Potrebbe non essere necessario installare e configurare il database per eseguire lo sviluppo. Esistono stub di test che sostituiscono la chiamata al database. Vedi "Test Stub" di seguito. </p>
<h2> Installa provider </h2>
<p> Se si utilizza Visual Studio o Visual Studio Code, il provider LocalDb Sql Server Express è già installato. In caso contrario, eseguire "Installazione del provider LocalDb" di seguito. </p>
<h3> Installazione del provider LocalDb </h3>
<p> Vai a <a href="https://www.microsoft.com/en-us/sql-server/sql-server-downloads">SQL Server Express.</a> Per Windows, scarica l&#39;edizione specializzata "Express" di SQL Server. Durante l&#39;installazione, selezionare "Personalizzato" e selezionare "LocalDb". </p>

<p> LocalDb è disponibile anche per MacOs e Linux. Se lo installi per una delle piattaforme, ti preghiamo di aggiornare questo documento con i passaggi ed eseguire una richiesta pull. </p>
<h3> Altri fornitori </h3>
<p> Oltre a LocalSb, EF Core supporta <a href= "https://docs.microsoft.com/en-us/ef/core/providers/?tabs=dotnet-core-cli">altri provider,</a> che è possibile utilizzare per lo sviluppo, incluso SqlLite. Sarà necessario modificare l&#39;installazione di DbContext in startup.cs e la stringa di connessione in appsettings.json. </p>
<h2> Crea schema database </h2>
<p> Il database viene creato tramite la funzione "prima il codice" di Entity Framework Core. Esamina le classi C# nel modello di dati e crea automaticamente tutte le tabelle e le relazioni. Esistono due passaggi: (1) Creare il codice "migrazioni" per eseguire l&#39;aggiornamento e (2) eseguire l&#39;aggiornamento. </p>

<ul>
<li> cd Backend / WebApp </li>
<li> le migrazioni dotnet ef aggiungono --project iniziale. \ Database \ DatabaseAccess_Lib </li>
<li> aggiornamento database dotnet ef --project .. \ Database \ DatabaseAccess_Lib </li>
</ul><h2> Esplora il database creato </h2><h3> In VsCode </h3>
<p> Aggiungi quanto segue al tuo settings.json utente in VsCode: </p>
<pre> <code> "mssql.connections": [ { "server": "(localdb)\\mssqllocaldb", "database": "Govmeeting", "authenticationType": "Integrated", "profileName": "GMProfile", "password": "" } ],</code> </pre>
<ul>
<li> Premere ctrl-alt-D o premere l&#39;icona Server SQL sul margine sinistro. </li>
<li> Aprire la connessione GMProfile per visualizzare e lavorare con gli oggetti del database. </li>
<li> Apri "Tabelle". Dovresti vedere tutte le tabelle create quando hai creato lo schema sopra. Ciò include le tabelle AspNetxxxx per l&#39;autorizzazione e le tabelle per il modello di dati Govmeeting. </li>
</ul><h3> In Visual Studio </h3>
<ul>
<li> Vai alla voce di menu: Visualizza -&gt; Esplora oggetti di SQL Server. </li>
<li> Espandere SQL Server -&gt; (localdb) \ MSSQLLocalDb -&gt; Database -&gt; Govmeeting </li>
<li> Apri "Tabelle". Dovresti vedere tutte le tabelle create quando hai creato lo schema sopra. Ciò include le tabelle AspNetxxxx per l&#39;autorizzazione e le tabelle per il modello di dati Govmeeting. </li>
</ul><h3> Altre piattaforme </h3>
<p> Esiste <a href="https://github.com/Microsoft/sqlopsstudio?WT.mc_id=-blog-scottha">SQL Operations Studio</a> multipiattaforma e open source <a href="https://github.com/Microsoft/sqlopsstudio?WT.mc_id=-blog-scottha">,</a> "uno strumento di gestione dei dati che consente di lavorare con SQL Server, Azure SQL DB e SQL DW da Windows, macOS e Linux". Puoi scaricare gratuitamente <a href="https://docs.microsoft.com/en-us/sql/sql-operations-studio/download?view=sql-server-2017&WT.mc_id=-blog-scottha">SQL Operations Studio qui.</a> </p>

<p> Se si utilizza questo o un altro strumento per esplorare i database di SQL Server, aggiornare queste istruzioni. </p>
<h2> Test Stub </h2>
<p> Il codice per archiviare / recuperare i dati della trascrizione nel database non è ancora stato scritto. Pertanto DatabaseRepositories_Lib utilizza invece dati di test statici. In WebApp / appsettings.json, la proprietà "UseDatabaseStubs" è impostata su "true", che indica di chiamare le routine di stub. </p>

<p> Tuttavia, il codice di registrazione e di accesso dell&#39;utente in WebApp utilizza il database. Accede alle tabelle di autenticazione dell&#39;utente Asp.Net. WebApp autentica le chiamate API da ClientApp in base all&#39;utente attualmente connesso. </p>

<p> È possibile utilizzare il valore di pre-processore "NOAUTH" in WebApp per ignorare l&#39;autenticazione. Utilizzare uno di questi metodi: </p>

<ul>
<li> In FixasrController.cs o AddtagsController.cs, annullare il commento della riga "#if NOAUTH" nella parte superiore del file. </li>
<li> Per disabilitarlo per tutti i controller, aggiungilo a WebApp.csproj: </li>
</ul><pre> <code> &lt;PropertyGroup Condition="&#39;$(Configuration)|$(Platform)&#39;==&#39;Debug|AnyCPU&#39;&gt; &lt;DefineConstants&gt;NOAUTH&lt;/DefineConstants&gt; &lt;/PropertyGroup&gt;</code> </pre>
<ul>
<li> In Visual Studio, vai alle pagine delle proprietà di WebApp -&gt; Build -&gt; e inserisci NOAUTH nella casella "Simboli di compilazione condizionale". </li>
</ul><hr />
<p><a name="GoogleCloud"></a></p>
<h1> Google Cloud Platform <br/></h1>
<p> <a href="about?id=setup#Contents">[Contenuti]</a> </p>

<p> Per utilizzare le API di Google Speech per la conversione da sintesi vocale a testo, è necessario un account Google Cloud Platform (GCP). Per la maggior parte dei lavori di sviluppo in Govmeeting, è possibile utilizzare i dati di test esistenti. Ma se vuoi trascrivere nuove registrazioni, otterrai un GCP. L&#39;API di Google è in grado di trascrivere registrazioni in oltre 120 lingue e varianti. </p>

<p> Google offre agli sviluppatori un account gratuito che include un credito (attualmente $ 300). Il costo attuale dell&#39;utilizzo dell&#39;API Speech è gratuito per un massimo di 60 minuti di conversione al mese. Successivamente, il costo per il "modello avanzato" (che è ciò di cui abbiamo bisogno) è di $ 0,009 per 15 secondi. ($ 2,16 l&#39;ora) </p>

<ul>
<li>
<p> Apri un account con <a href="https://cloud.google.com/free/">Google Cloud Platform</a> </p>
</li>
<li>
<p> Vai a <a href="http://console.cloud.google.com">Google Cloud Dashboard</a> e crea un progetto. </p>
</li>
<li>
<p> Vai alla <a href="http://console.developers.google.com">Console</a> per gli <a href="http://console.developers.google.com">sviluppatori di Google</a> e abilita le API di Speech & Cloud Storage </p>
</li>
<li>
<p> Generare una credenziale "account di servizio" per questo progetto. Fai clic su Credenziali nella console di sviluppo. </p>
</li>
<li>
<p> Assegnare a questo account le autorizzazioni "Editor" per il progetto. Clicca sull&#39;account Nella pagina successiva, fai clic su Autorizzazioni. </p>
</li>
<li>
<p> Scarica il file JSON delle credenziali. </p>
</li>
<li>
<p> Creare una cartella <code>SECRETS</code> come fratello nella cartella del progetto clonato </p>
</li>
<li>
<p> Inserire il file delle credenziali in SECRETS e rinominarlo <code>TranscribeAudio.json</code> . </p>
</li>
</ul><h2> Prova la trascrizione da Discorso a testo </h2>
<ul>
<li>
<p> Impostare il progetto di avvio in Visual Studio su <code>Backend/WorkflowApp</code> . Premi F5. </p>
</li>
<li>
<p> Copia (non spostare) uno dei file MP4 di esempio da testdata a DATAFILES / RECEIVED. </p>
</li>
</ul>
<p> Il programma ora riconoscerà che è apparso un nuovo file e inizierà a elaborarlo. Il file MP4 verrà spostato su "COMPLETATO" al termine. Vedrai i risultati nelle cartelle secondarie, che sono stati creati nella directory "DATAFILES". </p>

<p> In appsettings.json è presente la proprietà "RecordingSizeForDevelopment". Attualmente è impostato su "180". Questo fa sì che la routine di trascrizione in ProcessRecording_Lib elabori solo i primi 180 secondi della registrazione. </p>
<hr />
<p><a name="GoogleApi"></a></p>
<h1> Chiavi API di Google <br/></h1>
<p> <a href="about?id=setup#Contents">[Contenuti]</a> </p>

<p> Queste chiavi saranno necessarie se si desidera utilizzare o lavorare su determinate funzionalità del processo di registrazione e accesso. </p>

<ul>
<li> Le chiavi ReCaptcha sono necessarie per utilizzare ReCaptcha durante la registrazione dell&#39;utente. Possono essere ottenuti su <a href="https://developers.google.com/recaptcha/">Google reCaptcha</a> . </li>
<li> Le credenziali di OAuth 2.0 vengono utilizzate per eseguire l&#39;accesso di utenti esterni senza che l&#39;utente debba creare un account personale sul sito. Visita la <a href="https://console.developers.google.com/">Console dell&#39;API di Google</a> per ottenere credenziali come un ID client e un segreto client. </li>
</ul>
<p> Creare una cartella <code>SECRETS</code> come fratello nella cartella del progetto clonato. Crea un file al suo interno chiamato "appsettings.Development.json", con il seguente formato. </p>
<pre> <code>{ "ExternalAuth": { "Google": { "ClientId": "your-client-Id", "ClientSecret": "your-client-secret" } }, "ReCaptcha:SiteKey": "your-site-key", "ReCaptcha:Secret": "your-secret" }</code> </pre>
<p> Modificalo per contenere le chiavi che hai appena ottenuto: </p>
<hr /><h2> Test reCaptcha </h2>
<ul>
<li> Esegui il progetto WebApp. </li>
<li> Fai clic su "Registrati" in alto a destra. </li>
<li> Dovrebbe apparire l&#39;opzione reCaptcha. </li>
</ul><hr /><h2> Prova l&#39;autenticazione di Google </h2>
<ul>
<li> Esegui il progetto WebApp. </li>
<li> Fai clic su "Accedi" in alto a destra. </li>
<li> In "Utilizza un altro servizio per accedere", seleziona "Google". </li>
</ul>