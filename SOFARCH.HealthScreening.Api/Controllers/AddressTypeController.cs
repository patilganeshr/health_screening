using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SOFARCH.HealthScreening.API.Controllers
{
    public class AddressTypeController : ApiController
    {
        private readonly Business.AddressType _addressType;

        public AddressTypeController()
        {
            _addressType = new Business.AddressType();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="addressType"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("SaveAddressType")]
        public Int32 SaveAddressType(Entities.AddressType addressType)
        {
            return _addressType.SaveAddressType(addressType);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="addressType"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("DeleteAddressType")]
        public bool DeleteAddressType(Entities.AddressType addressType)
        {
            return _addressType.DeleteAddressType(addressType);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Route("GetAllAddressTypes")]
        public List<Entities.AddressType> GetAllAddressTypes()
        {
            return _addressType.GetAllAddressTypes();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="addressTypeId"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("GetAddressTypeById/{addressTypeId}")]
        public Entities.AddressType GetAddressTypeById(Int32 addressTypeId)
        {
            return _addressType.GetAddressTypeById(addressTypeId);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="addressTypeName"></param>
        /// <returns></returns>
        [Route("GetAddressTypeByName/{addressTypeName}")]
        public Entities.AddressType GetAddressTypeByName(string addressTypeName)
        {
            return _addressType.GetAddressTypeByName(addressTypeName);
        }

    }
}
