using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SOFARCH.HealthScreening.Api.Controllers
{
    public class ClientTypeController : ApiController
    {
        private readonly Business.ClientType _clientType;

        public ClientTypeController()
        {
            _clientType = new Business.ClientType();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientType"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("SaveClientType")]
        public Int32 SaveClientType(Entities.ClientType clientType)
        {
            return _clientType.SaveClientType(clientType);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientType"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("DeleteClientType")]
        public bool DeleteClientType(Entities.ClientType clientType)
        {
            return _clientType.DeleteClientType(clientType);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Route("GetAllClientTypes")]
        public List<Entities.ClientType> GetAllClientTypes()
        {
            return _clientType.GetAllClientTypes();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientTypeId"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("GetClientTypeById/{clientTypeId}")]
        public Entities.ClientType GetClientTypeById(Int32 clientTypeId)
        {
            return _clientType.GetClientTypeById(clientTypeId);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientTypeName"></param>
        /// <returns></returns>
        [Route("GetClientTypeByName/{clientTypeName}")]
        public Entities.ClientType GetClientTypeByName(string clientTypeName)
        {
            return _clientType.GetClientTypeByName(clientTypeName);
        }

    }
}
