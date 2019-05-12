using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace SOFARCH.HealthScreening.Business
{
    public class ClientAddress
    {
        private readonly DataModel.ClientAddress _clientAddress;

        public ClientAddress()
        {
            _clientAddress = new DataModel.ClientAddress();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientId"></param>
        /// <param name="clientAddresseeName"></param>
        /// <returns></returns>
        public bool IsClientAddresseeNameExists(Int32 clientId, string clientAddresseeName)
        {
            return _clientAddress.IsClientAddresseeNameExists(clientId, clientAddresseeName);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientAddress"></param>
        /// <returns></returns>
        public Int32 SaveClientAddress(Entities.ClientAddress clientAddress)
        {
            return _clientAddress.SaveClientAddress(clientAddress);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientAddress"></param>
        /// <returns></returns>
        public bool DeleteClientAddres(Entities.ClientAddress clientAddress)
        {
            return _clientAddress.DeleteClientAddress(clientAddress);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<Entities.ClientAddress> GetAllClientAddressess()
        {
            return _clientAddress.GetAllClientAddressess();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<Entities.ClientAddress> GetAllClientAddressessByClientId(Int32 clientId)
        {
            return _clientAddress.GetAllClientAddressessByClientId(clientId);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientTypeId"></param>
        /// <returns></returns>
        public List<Entities.ClientAddress> GetClientAddressNamesByClientTypeId(Int32 clientTypeId)
        {
            return _clientAddress.GetClientAddressNamesByClientTypeId(clientTypeId);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientAddressId"></param>
        /// <returns></returns>
        public Entities.ClientAddress GetClientAddressById(Int32 clientAddressId)
        {
            return _clientAddress.GetClientAddressById(clientAddressId);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientAddresseeName"></param>
        /// <returns></returns>
        public Entities.ClientAddress GetClientAddressByName(string clientAddresseeName)
        {
            return _clientAddress.GetClientAddressByName(clientAddresseeName);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientAddressName"></param>
        /// <returns></returns>
        public List<Entities.ClientAddress> SearchClientAddressNameByClientAddressName(string clientAddressName)
        {
            return _clientAddress.SearchClientAddressNameByClientAddressName(clientAddressName);
        }

    }
}
