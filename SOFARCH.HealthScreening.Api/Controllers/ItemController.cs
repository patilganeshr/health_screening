using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SOFARCH.HealthScreening.API.Controllers
{
    public class ItemController : ApiController
    {
        private readonly Business.Item _item;

        public ItemController()
        {
            _item = new Business.Item();
        }

        ///// <summary>
        ///// 
        ///// </summary>
        ///// <param name="itemName"></param>
        ///// <param name="brandId"></param>
        ///// <param name="itemQualityId"></param>
        ///// <returns></returns>
        //[HttpGet]
        //[Route("CheckItemIsExists/{itemName}/{brandId}/{itemQualityId}")]
        //public bool CheckItemIsExists(string itemName, Int32 brandId, Int32 itemQualityId)
        //{
        //    return _item.CheckItemIsExists(itemName, brandId, itemQualityId);
        //}

        ///// <summary>
        ///// 
        ///// </summary>
        ///// <param name="item"></param>
        ///// <returns></returns>
        //[HttpPost]
        //[Route("SaveItem")]
        //public Int32 SaveItem(Entities.Item item)
        //{
        //    return _item.SaveItem(item);
        //}

        ///// <summary>
        ///// 
        ///// </summary>
        ///// <param name="item"></param>
        ///// <returns></returns>
        //[HttpPost]
        //[Route("DeleteItem")]
        //public bool DeleteItem(Entities.Item item)
        //{
        //    return _item.DeleteItem(item);

        //}

        ///// <summary>
        ///// 
        ///// </summary>
        ///// <returns></returns>
        //[Route("GetAllItems")]
        //public List<Entities.Item> GetAllItems()
        //{
        //    return _item.GetAllItems();
        //}

        //[Route("GetItemsByBrandCategoryAndQuality")]
        //public List<Entities.Item> GetItemsByBrandCategoryAndQuality()
        //{
        //    return _item.GetItemsByBrandCategoryAndQuality();
        //}

        ///// <summary>
        ///// 
        ///// </summary>
        ///// <param name="itemId"></param>
        ///// <returns></returns>
        //[HttpPost]
        //[Route("GetItemById/{itemId}")]
        //public Entities.Item GetItemById(Int32 itemId)
        //{
        //    return _item.GetItemById(itemId);
        //}

        ///// <summary>
        ///// 
        ///// </summary>
        ///// <param name="itemName"></param>
        ///// <returns></returns>
        //[Route("GetItemByName/{itemName}")]
        //public Entities.Item GetItemByName(string itemName)
        //{
        //    return _item.GetItemByName(itemName);
        //}

        ///// <summary>
        ///// 
        ///// </summary>
        ///// <param name="itemName"></param>
        ///// <returns></returns>
        //[HttpGet]
        //[Route("SearchItemByItemName/{itemName}")]
        //public List<Entities.Item> SearchItemByItemName(string itemName)
        //{
        //    return _item.SearchItemByItemName(itemName);
        //}

        //[Route("GetItemsByBrandAndItemCategory/{brandId}/{itemCategoryId}")]
        //public List<Entities.Item> GetItemsByBrandAndItemCategory(Int32 brandId, Int32 itemCategoryId)
        //{
        //    return _item.GetItemsByBrandAndItemCategory(brandId, itemCategoryId);
        //}

        ///// <summary>
        ///// 
        ///// </summary>
        ///// <param name="itemName"></param>
        ///// <returns></returns>
        //[HttpPost]
        //[Route("SearchItem")]
        //public List<Entities.Item> SearchItem([FromBody] Entities.Item item)
        //{
        //    return _item.SearchItemByItemName(item.ItemName);
        //}

    }
}
