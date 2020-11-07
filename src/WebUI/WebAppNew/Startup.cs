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
using System.Net.Security;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

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

        public void ConfigureServices(IServiceCollection services)
        {
            ConfigureLoggingService();
            logger.Info("ConfigureLoggingService");

            ConfigureAppsettings(services);
            logger.Info("ConfigureAppsettings");

            ConfigureDbContext(services);
            logger.Info("ConfigureDbContext");

            services.AddHealthChecks();
            logger.Info("AddHealthChecks");

            ConfigureAuthenticationServices(services, logger);
            logger.Info("Add Add Authentication");

            services.AddControllersWithViews();
            logger.Info("Add services for Web API, MVC & Razor Views");

            services.AddRazorPages();
            logger.Info("Add services for Razor Pages");

            services.Configure<RazorViewEngineOptions>(options => options.ViewLocationExpanders.Add(new FeatureLocationExpander()));
            logger.Info("Enable Feature Folders");
            // https://scottsauber.com/2016/04/25/feature-folder-structure-in-asp-net-core/

            services.AddSpaStaticFiles(configuration => configuration.RootPath = "ClientApp/dist");
            logger.Info("AddSpaStaticFiles");
            // Angular files will be served from this directory in production. 
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            // START OF ENDPOINT ZONE

            app.UseAuthentication();
            app.UseAuthorization();

            app.Use(next => context =>
            {
                var endpoint = context.GetEndpoint();
                if (endpoint == null)
                {
                    return next(context);
                }

                var route = (endpoint is RouteEndpoint routeEndpoint) ? routeEndpoint.RoutePattern : null;
                var metadata = endpoint.Metadata;

                return next(context);
            });

            // END OF ENDPOINT ZONE

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
                endpoints.MapHealthChecks("/health").RequireAuthorization();
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

        private void ConfigureLoggingService()
        {
            // Set a variable in the gdc which is be used in NLog.config for the
            // base path of our app: ${gdc:item=appbasepath} 
            string logfilesPath = GMFileAccess.GetSolutionSiblingFolder(Configuration["Logging:LogfilesPath"]);
            //string logfilesPath = GMFileAccess.GetFullPath(Configuration["AppSettings:LogfilesPath"]);
            GlobalDiagnosticsContext.Set("logfilesPath", logfilesPath);

            // Create an instance of NLog.Logger manually here since it is not available
            // from dependency injection yet.
            logger = LogManager.LoadConfiguration("nlog.config").GetCurrentClassLogger();
        }

        private void ConfigureAppsettings(IServiceCollection services)
        {
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
        }

        private void ConfigureDbContext(IServiceCollection services)
        {
            logger.Info("Add ApplicationDbContext");
            services.AddTransient<DBOperations>();
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(
                    Configuration["AppSettings:ConnectionString"]
                    //sqlServerOptions => sqlServerOptions.MigrationsAssembly("DatabaseAccess_Lib")
                    //sqlServerOptions => sqlServerOptions.MigrationsAssembly("WebApp")
                    ));
        }
    }
}
