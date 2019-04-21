using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SOFARCH.HealthScreening.API.Controllers
{
    public class ItemCategoryController : ApiController
    {
        private readonly Business.ItemCategory _itemCategory;

        public ItemCategoryController()
        {
            _itemCategory = new Business.ItemCategory();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="itemCategory"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("SaveItemCategory")]
        public Int32 SaveItemCategory(Entities.ItemCategory itemCategory)
        {
            return _itemCategory.SaveItemCategory(itemCategory);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="itemCategory"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("DeleteItemCategory")]
        public bool DeleteItemCategory(Entities.ItemCategory itemCategory)
        {
            return _itemCategory.DeleteItemCategory(itemCategory);

        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Route("GetAllItemCategories")]
        public List<Entities.ItemCategory> GetAllItemCategories()
        {
            return _itemCategory.GetAllItemCategories();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="itemCategoryId"></param>
        /// <returns></returns>
        [Route("GetItemCategoryDetailsById/{itemCategoryId}")]
        public Entities.ItemCategory GetItemCategoryDetailsById(Int32 itemCategoryId)
        {
            return _itemCategory.GetItemCategoryDetailsById(itemCategoryId);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="itemCategoryName"></param>
        /// <returns></returns>
        [Route("GetItemCategoryDetailsByName/{itemCategoryName}")]
        public Entities.ItemCategory GetItemCategoryDetailsByName(string itemCategoryName)
        {
            return _itemCategory.GetItemCategoryDetailsByName(itemCategoryName);
        }

    }
}
