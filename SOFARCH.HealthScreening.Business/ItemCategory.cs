using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace SOFARCH.HealthScreening.Business
{
    public class ItemCategory
    {
       private readonly DataModel.ItemCategory _itemCategory;

        public ItemCategory()
        {
            _itemCategory = new DataModel.ItemCategory();
        }

        public Int32 SaveItemCategory(Entities.ItemCategory itemCategory)
        {
            return _itemCategory.SaveItemCategory(itemCategory);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="itemCategory"></param>
        /// <returns></returns>
        public bool DeleteItemCategory(Entities.ItemCategory itemCategory)
        {
            return _itemCategory.DeleteItemCategory(itemCategory);

        }

        public List<Entities.ItemCategory> GetAllItemCategories()
        {
            return _itemCategory.GetListOfAllItemCategories();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="itemCategoryId"></param>
        /// <returns></returns>
        public Entities.ItemCategory GetItemCategoryDetailsById(Int32 itemCategoryId)
        {
            return _itemCategory.GetItemCategoryDetailsById(itemCategoryId);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="itemCategoryName"></param>
        /// <returns></returns>
        public Entities.ItemCategory GetItemCategoryDetailsByName(string itemCategoryName)
        {
            return _itemCategory.GetItemCategoryDetailsByName(itemCategoryName);
        }


    }
}
