using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace SOFARCH.HealthScreening.Business
{
    public class ClientAddressContact
    {
        private readonly DataModel.ClientAddressContact _clientAddressContact;

        public ClientAddressContact()
        {
            _clientAddressContact = new DataModel.ClientAddressContact();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientAddressContact"></param>
        /// <returns></returns>
        public Int32 SaveClientAddressContact(Entities.ClientAddressContact clientAddressContact)
        {
            return _clientAddressContact.SaveClientAddressContact(clientAddressContact);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientAddressContact"></param>
        /// <returns></returns>
        public bool DeleteClientAddressContactByClientAddressId(Entities.ClientAddressContact clientAddressContact)
        {
            return _clientAddressContact.DeleteClientAddressContactByClientAddressId(clientAddressContact);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientAddressContact"></param>
        /// <returns></returns>
        public bool DeleteClientAddressContactByContactId(Entities.ClientAddressContact clientAddressContact)
        {
            return _clientAddressContact.DeleteClientAddressContactByContactId(clientAddressContact);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientAddressId"></param>
        /// <returns></returns>
        public List<Entities.ClientAddressContact> GetAllClientAddressContats(Int32 clientAddressId)
        {
            return _clientAddressContact.GetAllClientAddressContats(clientAddressId);
        }

        public Entities.ClientAddressContact GetClientAddressContactById(Int32 contactId)
        {
            return _clientAddressContact.GetClientAddressContactById(contactId);
        }

    }
}
