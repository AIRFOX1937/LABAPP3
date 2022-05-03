using LABAPP3.Models;
 using Microsoft.AspNetCore.Builder;
 using Microsoft.Data.SqlClient;
 using Microsoft.EntityFrameworkCore;
 namespace LABAPP3
 {
 public class Startup
 {
 public void ConfigureServices(IServiceCollection services)
 {
 // устанавливаем контекст данных
 services.AddDbContext<PeoplesContext>(options =>
options.UseSqlServer(SqlConnectionIntegratedSecurity));
 services.AddControllers(); // используем контроллеры без представлений
 }
 public static string SqlConnectionIntegratedSecurity
 {
     get
 {
         var sb = new SqlConnectionStringBuilder
 {
             DataSource = @"(localdb)\MSSQLLocalDB",
 // Подключение будет с проверкой подлинности пользователя Windows
 IntegratedSecurity = true,
 // Название целевой базы данных.
 InitialCatalog = "Users"
 };
         return sb.ConnectionString;
         }
     }
 public void Configure(IApplicationBuilder app)
 {
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseDeveloperExceptionPage();
 app.UseRouting();
     app.UseEndpoints(endpoints =>
     {
         endpoints.MapControllers(); // подключаем маршрутизацию на контроллеры
     });
     }
 }
 }
