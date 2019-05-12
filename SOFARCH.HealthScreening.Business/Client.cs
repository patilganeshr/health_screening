using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace SOFARCH.HealthScreening.Business
{
    public class Client
    {
        private readonly DataModel.Client _client;

        public Client()
        {
            _client = new DataModel.Client();
        }

        public bool IsClientNameExists(string clientName)
        {
            return _client.IsClientNameExists(clientName);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="client"></param>
        /// <returns></returns>
        //public bool DeleteClient(Entities.Client client)
        //{
        //    return _client.DeleteClient(client);
        //}

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<Entities.Client> GetAllClients()
        {
            return _client.GetAllClients();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientId"></param>
        /// <returns></returns>
        public Entities.Client GetClientById(Int32 clientId)
        {
            return _client.GetClientById(clientId);
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientName"></param>
        /// <returns></returns>
        public Entities.Client GetClientByName(string clientName)
        {
            return _client.GetClientByName(clientName);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="client"></param>
        /// <returns></returns>
        public Int32 SaveClient(List<Entities.Client> client)
        {
            return _client.SaveClient(client);
        }

    }
}
