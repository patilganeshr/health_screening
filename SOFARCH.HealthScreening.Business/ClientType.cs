using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace SOFARCH.HealthScreening.Business
{
    public class ClientType
    {
        private readonly DataModel.ClientType _clientType;

        public ClientType()
        {
            _clientType = new DataModel.ClientType();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientType"></param>
        /// <returns></returns>
        public Int32 SaveClientType(Entities.ClientType clientType)
        {
            return _clientType.SaveClientType(clientType);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientType"></param>
        /// <returns></returns>
        public bool DeleteClientType(Entities.ClientType clientType)
        {
            return _clientType.DeleteClientType(clientType);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<Entities.ClientType> GetAllClientTypes()
        {
            return _clientType.GetAllClientTypes();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientTypeId"></param>
        /// <returns></returns>
        public Entities.ClientType GetClientTypeById(Int32 clientTypeId)
        {
            return _clientType.GetClientTypeById(clientTypeId);
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientTypeName"></param>
        /// <returns></returns>
        public Entities.ClientType GetClientTypeByName(string clientTypeName)
        {
            return _clientType.GetClientTypeByName(clientTypeName);
        }


    }
}
