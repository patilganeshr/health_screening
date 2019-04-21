using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class Item : BaseEntity
    {        
        public Int32? ItemId { get; set; }

        public Int32? BrandId { get; set; }

        public Int32? ItemCategoryId { get; set; }

        public string ItemCode { get; set; }

        public string ItemName { get; set; }

        public string ItemDesc { get; set; }

        public Int32? ItemQualityId { get; set; }

        public bool? GenerateItemCodeAuto { get; set; }

        public Int32? UnitOfMeasurementId { get; set; }

        public Int32? OpeningUnit { get; set; }

        public string BarcodeNo { get; set; }

        public string HSNCode { get; set; }

        public Int32? ReOrderLevel { get; set; }

        public bool? IsSet { get; set; }

        public bool? IsSellAtNetRate { get; set; }

        public decimal? PurchaseRate { get; set; }

        public decimal? SaleRate { get; set; }

        public string BrandName { get; set; }

        public string ItemCategoryName { get; set; }

        public string ItemQualityName { get; set; }

        public string UnitCode { get; set; }

        //public List<ItemSetSubItem> ItemSetSubItems { get; set; }

        //public List<ItemPicture> ItemPictures { get; set; }

        public List<ItemRate> ItemRates { get; set; }

    }
}
