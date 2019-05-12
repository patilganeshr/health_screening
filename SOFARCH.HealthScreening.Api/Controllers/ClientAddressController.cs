using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SOFARCH.HealthScreening.Api.Controllers
{
    public class ClientAddressController : ApiController
    {
        private readonly Business.ClientAddress _clientAddress;

        public ClientAddressController()
        {
            _clientAddress = new Business.ClientAddress();
        }

        [HttpGet]
        [Route("IsClientAddresseeNameExists/{clientId}/{clientAddresseeName}")]
        public bool IsClientAddresseeNameExists(Int32 clientId, string clientAddresseeName)
        {
            return _clientAddress.IsClientAddresseeNameExists(clientId, clientAddresseeName);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientAddress"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("SaveClientAddress")]
        public Int32 SaveClientAddress(Entities.ClientAddress clientAddress)
        {
            return _clientAddress.SaveClientAddress(clientAddress);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientAddress"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("DeleteClientAddres")]
        public bool DeleteClientAddres(Entities.ClientAddress clientAddress)
        {
            return _clientAddress.DeleteClientAddres(clientAddress);
        }

        [Route("GetAllClientAddressess")]
        public List<Entities.ClientAddress> GetAllClientAddressess()
        {
            return _clientAddress.GetAllClientAddressess();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Route("GetAllClientAddressessByClientId/{clientId}")]
        public List<Entities.ClientAddress> GetAllClientAddressessByClientId(Int32 clientId)
        {
            return _clientAddress.GetAllClientAddressessByClientId(clientId);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientTypeId"></param>
        /// <returns></returns>
        [Route("GetClientAddressNamesByClientTypeId/{clientTypeId}")]
        public List<Entities.ClientAddress> GetClientAddressNamesByClientTypeId(Int32 clientTypeId)
        {
            return _clientAddress.GetClientAddressNamesByClientTypeId(clientTypeId);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientAddressId"></param>
        /// <returns></returns>
        [Route("GetClientAddressById/{clientAddressId}")]
        public Entities.ClientAddress GetClientAddressById(Int32 clientAddressId)
        {
            return _clientAddress.GetClientAddressById(clientAddressId);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientAddresseeName"></param>
        /// <returns></returns>
        [Route("GetClientAddressByName/{clientAddresseeName}")]
        public Entities.ClientAddress GetClientAddressByName(string clientAddresseeName)
        {
            return _clientAddress.GetClientAddressByName(clientAddresseeName);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientAddressName"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("SearchClientAddressNameByClientAddressName/{clientAddressName}")]
        public List<Entities.ClientAddress> SearchClientAddressNameByClientAddressName(string clientAddressName)
        {
            return _clientAddress.SearchClientAddressNameByClientAddressName(clientAddressName);
        }

    }
}
