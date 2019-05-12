using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SOFARCH.HealthScreening.Api.Controllers
{
    public class ClientAddressContactController : ApiController
    {
        private readonly Business.ClientAddressContact _clientAddressContact;

        public ClientAddressContactController()
        {
            _clientAddressContact = new Business.ClientAddressContact();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientAddressContact"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("SaveClientAddressContact")]
        public Int32 SaveClientAddressContact(Entities.ClientAddressContact clientAddressContact)
        {
            return _clientAddressContact.SaveClientAddressContact(clientAddressContact);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientAddressContact"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("DeleteClientAddressContactByClientAddressId")]
        public bool DeleteClientAddressContactByClientAddressId(Entities.ClientAddressContact clientAddressContact)
        {
            return _clientAddressContact.DeleteClientAddressContactByClientAddressId(clientAddressContact);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientAddressContact"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("DeleteClientAddressContactByContactId")]
        public bool DeleteClientAddressContactByContactId(Entities.ClientAddressContact clientAddressContact)
        {
            return _clientAddressContact.DeleteClientAddressContactByContactId(clientAddressContact);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientAddressId"></param>
        /// <returns></returns>
        [Route("GetAllClientAddressContats")]
        public List<Entities.ClientAddressContact> GetAllClientAddressContats(Int32 clientAddressId)
        {
            return _clientAddressContact.GetAllClientAddressContats(clientAddressId);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="contactId"></param>
        /// <returns></returns>
        [Route("GetClientAddressContactById/{contactId}")]
        public Entities.ClientAddressContact GetClientAddressContactById(Int32 contactId)
        {
            return _clientAddressContact.GetClientAddressContactById(contactId);
        }

    }
}
