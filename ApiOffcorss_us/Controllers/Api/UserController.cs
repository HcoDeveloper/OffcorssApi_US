using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using ApiOffcorss_us.Models;
using System.Net;
using System.Configuration;
using System.Data.SqlClient;
using MySql.Data.MySqlClient;

namespace ApiOffcorss_us.Controllers.Api
{
    public class UserController : ApiController
    {
        [HttpPost]
        public IHttpActionResult GetUsers()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            //repository.SaveRecordTime(recordTime);
            return Ok("Datos insertados correctamente");
        }


        [HttpPost]
        public IHttpActionResult Save([FromBody] User entidad) 
        {
            try
            {
                User response = null;
                if (entidad != null)
                {

                    string Query = $"INSERT INTO users (NAME, last_name, mail, state, phone) VALUES" +
                    $"('{entidad.Name}', '{entidad.Last_name}', '{entidad.Mail}', '{entidad.State}', '{entidad.Phone}')";

                    ReceiveData(Query);

                }
                return Content(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, "Error al intentar procesar el mensaje." + ex.Message);
            }
        }

        private static void ReceiveData(string Query)
        {
            try
            {
                string con = ConfigurationManager.ConnectionStrings["con"].ConnectionString;

                MySqlConnection connection = new MySqlConnection(con);
                connection.Open();

                MySqlCommand cmd = new MySqlCommand(Query, connection);
                cmd.ExecuteNonQuery();
            }
            catch (MySqlException ex)
            {
                throw ex;
            }
        }
    }
}
