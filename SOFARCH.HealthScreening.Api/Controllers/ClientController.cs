using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace SOFARCH.HealthScreening.Api.Controllers
{
    public class ClientController : ApiController
    {
        private readonly Business.Client _client;

        public ClientController()
        {
            _client = new Business.Client();
        }

        [HttpGet]
        [Route("IsClientNameExists/{clientName}")]
        public bool IsClientNameExists(string clientName)
        {
            return _client.IsClientNameExists(clientName);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="client"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("DeleteClient")]
        public bool DeleteClient(Entities.Client client)
        {
            return _client.DeleteClient(client);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Route("GetAllClients")]
        public List<Entities.Client> GetAllClients()
        {
            return _client.GetAllClients();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientId"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("GetClientById")]
        public Entities.Client GetClientById(Int32 clientId)
        {
            return _client.GetClientById(clientId);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientName"></param>
        /// <returns></returns>
        [Route("GetClientByName/{clientName}")]
        public Entities.Client GetClientByName(string clientName)
        {
            return _client.GetClientByName(clientName);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="client"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("SaveClient")]
        public Int32 SaveClient(List<Entities.Client> client)
        {
            return _client.SaveClient(client);
        }


        [HttpPost]
        [Route("GetPDFResult")]
        public HttpResponseMessage ReturnBytes([FromBody] byte[] bytes)
        {
            HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
            result.Content = new ByteArrayContent(bytes);
            result.Content.Headers.ContentType =
                new MediaTypeHeaderValue("application/octet-stream");

            return result;
        }

        //public IHttpActionResult GetPDFResult([FromBody] byte[] obj)
        //{

        //    //System.Web.HttpContext httpContext = null;
        //    var serverPath = System.Web.HttpContext.Current.Server.MapPath("../POS/");

        //    var folderPath = "PDF/";

        //    var imageData = obj.ToString();

        //    byte[] imgByteArray = Convert.FromBase64String(imageData);

        //    if (System.IO.Directory.Exists(serverPath + folderPath) == false)
        //    {
        //        System.IO.Directory.CreateDirectory(serverPath + folderPath);
        //    }

        //    System.IO.File.WriteAllBytes(serverPath + folderPath + "/Test.pdf", imgByteArray);
        
                
        //    return Ok();
        //}
    }
}
