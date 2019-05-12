using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace SOFARCH.HealthScreening.Business
{
    public class AddressType
    {
        private readonly DataModel.AddressType _addressType;

        public AddressType()
        {
            _addressType = new DataModel.AddressType();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="addressType"></param>
        /// <returns></returns>
        public Int32 SaveAddressType(Entities.AddressType addressType)
        {
            return _addressType.SaveAddressType(addressType);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="addressType"></param>
        /// <returns></returns>
        public bool DeleteAddressType(Entities.AddressType addressType)
        {
            return _addressType.DeleteAddressType(addressType);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<Entities.AddressType> GetAllAddressTypes()
        {
            return _addressType.GetAllAddressTypes();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="addressTypeId"></param>
        /// <returns></returns>
        public Entities.AddressType GetAddressTypeById(Int32 addressTypeId)
        {
            return _addressType.GetAddressTypeById(addressTypeId);
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="addressTypeName"></param>
        /// <returns></returns>
        public Entities.AddressType GetAddressTypeByName(string addressTypeName)
        {
            return _addressType.GetAddressTypeByName(addressTypeName);
        }


    }
}
