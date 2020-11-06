using GM.Configuration;
using GM.DatabaseAccess;
using GM.Utilities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using NLog;
using GM.WebApp.StartupCustomizations;

namespace WebAppNew
{
    public partial class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        NLog.Logger logger;
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //####################################
            // Set a variable in the gdc which is be used in NLog.config for the
            // base path of our app: ${gdc:item=appbasepath} 
            string logfilesPath = GMFileAccess.GetSolutionSiblingFolder(Configuration["Logging:LogfilesPath"]);
            //string logfilesPath = GMFileAccess.GetFullPath(Configuration["AppSettings:LogfilesPath"]);
            GlobalDiagnosticsContext.Set("logfilesPath", logfilesPath);

            //####################################
            // Create an instance of NLog.Logger manually here since it is not available
            // from dependency injection yet.
            logger = LogManager.LoadConfiguration("nlog.config").GetCurrentClassLogger();
            logger.Info("Just set value in GDC for NLog and created NLog.Logger instance");

            //####################################
            logger.Info("Configure AppSettings options");
            services.AddOptions();
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));
            services.Configure<AppSettings>(myOptions =>
            {
                logger.Info("Modify the configuration path options to be full paths.");
                // Modify the configuration path options to be full paths.
                myOptions.DatafilesPath = GMFileAccess.GetSolutionSiblingFolder(myOptions.DatafilesPath);
                myOptions.TestdataPath = GMFileAccess.GetSolutionSiblingFolder(myOptions.TestdataPath);
                logger.Info("DatafilesPath: {0}, TestdataPath: {2}",
                    myOptions.DatafilesPath, myOptions.TestdataPath);
            });

            //####################################
            logger.Info("Add ApplicationDbContext");
            services.AddTransient<DBOperations>();
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(
                    Configuration["AppSettings:ConnectionString"]
                    //sqlServerOptions => sqlServerOptions.MigrationsAssembly("DatabaseAccess_Lib")
                    //sqlServerOptions => sqlServerOptions.MigrationsAssembly("WebApp")
                    ));

            /////// TODO - uncomment
            //####################################
            logger.Info("Add Add Authentication");
            // ConfigureAuthenticationServices(services, logger);


            //####################################
            // Add the MVC Controller services that are common to both Web API and MVC,
            // and also add the services required for rendering Razor views. 
            logger.Info("Add Controllers with Views");
            services.AddControllersWithViews();


            //####################################
            logger.Info("Enable Feature Folders");
            // https://scottsauber.com/2016/04/25/feature-folder-structure-in-asp-net-core/
            services.Configure<RazorViewEngineOptions>(options =>
            {
                options.ViewLocationExpanders.Add(new FeatureLocationExpander());
            });

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    // spa.UseAngularCliServer(npmScript: "start");
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                }
            });
        }
    }
}
