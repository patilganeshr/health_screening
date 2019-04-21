using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.Common;

using Microsoft.Practices.EnterpriseLibrary.Common;
using Microsoft.Practices.EnterpriseLibrary.Data;
using DRE = DataRecordExtensions.DataRecordExtensions;

namespace SOFARCH.HealthScreening.DataModel
{
    public class Item
    {
        private readonly Database database;

        public Item()
        {
            database = DBConnect.getDBConnection();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        //private Int32 AddItem(Entities.Item item)
        //{
        //    var itemId = 0;

        //    DbCommand dbCommand = null;

        //    try
        //    {
        //        using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertItem))
        //        {
        //            database.AddInParameter(dbCommand, "@item_id", DbType.Int32, item.ItemId);
        //            database.AddInParameter(dbCommand, "@brand_id", DbType.Int32, item.BrandId);
        //            database.AddInParameter(dbCommand, "@item_category_id", DbType.Int32, item.ItemCategoryId);                    
        //            database.AddInParameter(dbCommand, "@item_name", DbType.String, item.ItemName);
        //            database.AddInParameter(dbCommand, "@item_desc", DbType.String, item.ItemDesc);
        //            database.AddInParameter(dbCommand, "@item_quality_id", DbType.Int32, item.ItemQualityId);
        //            database.AddInParameter(dbCommand, "@unit_of_measurement_id", DbType.Int32, item.UnitOfMeasurementId);
        //            database.AddInParameter(dbCommand, "@barcode_no", DbType.String, item.BarcodeNo);
        //            database.AddInParameter(dbCommand, "@hsn_code", DbType.String, item.HSNCode);
        //            database.AddInParameter(dbCommand, "@reorder_level", DbType.Int32, item.ReOrderLevel);
        //            database.AddInParameter(dbCommand, "@is_set", DbType.Boolean, item.IsSet);
        //            database.AddInParameter(dbCommand, "@created_by", DbType.Int32, item.CreatedBy);
        //            database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, item.CreatedByIP);

        //            database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

        //            itemId = database.ExecuteNonQuery(dbCommand);

        //            if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
        //            {
        //                itemId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
        //            }
        //        }
        //    }
        //    catch (Exception e)
        //    {
        //        throw e;
        //    }
        //    finally
        //    {
        //        dbCommand = null;
        //    }

        //    return itemId;
        //}

        //private Int32 AddItem(Entities.Item item, DbTransaction transaction)
        //{
        //    var itemId = 0;

        //    DbCommand dbCommand = null;

        //    try
        //    {
        //        using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertItem))
        //        {
        //            database.AddInParameter(dbCommand, "@item_id", DbType.Int32, item.ItemId);
        //            database.AddInParameter(dbCommand, "@brand_id", DbType.Int32, item.BrandId);
        //            database.AddInParameter(dbCommand, "@item_category_id", DbType.Int32, item.ItemCategoryId);
        //            database.AddInParameter(dbCommand, "@item_name", DbType.String, item.ItemName);
        //            database.AddInParameter(dbCommand, "@item_desc", DbType.String, item.ItemDesc);
        //            database.AddInParameter(dbCommand, "@item_quality_id", DbType.Int32, item.ItemQualityId);
        //            database.AddInParameter(dbCommand, "@unit_of_measurement_id", DbType.Int32, item.UnitOfMeasurementId);
        //            database.AddInParameter(dbCommand, "@barcode_no", DbType.String, item.BarcodeNo);
        //            database.AddInParameter(dbCommand, "@hsn_code", DbType.String, item.HSNCode);
        //            database.AddInParameter(dbCommand, "@reorder_level", DbType.Int32, item.ReOrderLevel);
        //            database.AddInParameter(dbCommand, "@is_set", DbType.Boolean, item.IsSet);
        //            database.AddInParameter(dbCommand, "@created_by", DbType.Int32, item.CreatedBy);
        //            database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, item.CreatedByIP);

        //            database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

        //            itemId = database.ExecuteNonQuery(dbCommand, transaction);

        //            if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
        //            {
        //                itemId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
        //            }
        //        }
        //    }
        //    catch (Exception e)
        //    {
        //        throw e;
        //    }
        //    finally
        //    {
        //        dbCommand = null;
        //    }

        //    return itemId;
        //}

        ///// <summary>
        ///// 
        ///// </summary>
        ///// <param name="item"></param>
        ///// <returns></returns>
        //public bool DeleteItem(Entities.Item item)
        //{
        //    bool isDeleted = false;

        //    DbCommand dbCommand = null;

        //    try
        //    {
        //        using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeleteItem))
        //        {
        //            database.AddInParameter(dbCommand, "@item_id", DbType.Int32, item.ItemId);
        //            database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, item.DeletedBy);
        //            database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, item.DeletedByIP);

        //            database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

        //            var result = database.ExecuteNonQuery(dbCommand);

        //            if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
        //            {
        //                isDeleted = Convert.ToBoolean(database.GetParameterValue(dbCommand, "@return_value"));
        //            }
        //        }
        //    }
        //    catch (Exception e)
        //    {
        //        throw e;
        //    }
        //    finally
        //    {
        //        dbCommand = null;
        //    }

        //    return isDeleted;

        //}

        //public bool DeleteItem(Entities.Item item, DbTransaction transaction)
        //{
        //    bool isDeleted = false;

        //    DbCommand dbCommand = null;

        //    try
        //    {
        //        using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeleteItem))
        //        {
        //            database.AddInParameter(dbCommand, "@item_id", DbType.Int32, item.ItemId);
        //            database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, item.DeletedBy);
        //            database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, item.DeletedByIP);

        //            database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

        //            var result = database.ExecuteNonQuery(dbCommand, transaction);

        //            if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
        //            {
        //                isDeleted = Convert.ToBoolean(database.GetParameterValue(dbCommand, "@return_value"));
        //            }
        //        }
        //    }
        //    catch (Exception e)
        //    {
        //        throw e;
        //    }
        //    finally
        //    {
        //        dbCommand = null;
        //    }

        //    return isDeleted;

        //}

        ///// <summary>
        ///// 
        ///// </summary>
        ///// <returns></returns>
        //public List<Entities.Item> GetAllItems()
        //{
        //    var items = new List<Entities.Item>();

        //    DbCommand dbCommand = null;

        //    try
        //    {
        //        dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetAllItems);

        //        using (IDataReader reader = database.ExecuteReader(dbCommand))
        //        {
        //            while (reader.Read())
        //            {
        //                ItemSetSubItem itemSetSubItem = new ItemSetSubItem();

        //                var item = new Entities.Item
        //                {
        //                    ItemId = DRE.GetNullableInt32(reader, "item_id", 0),
        //                    BrandId = DRE.GetNullableInt32(reader,"brand_id", 0),
        //                    BrandName = DRE.GetNullableString(reader, "brand_name", null),
        //                    ItemCode = DRE.GetNullableString(reader, "item_code", null),
        //                    ItemName = DRE.GetNullableString(reader, "item_name", null),
        //                    ItemDesc = DRE.GetNullableString(reader, "item_desc", null),
        //                    ItemCategoryId = DRE.GetNullableInt32(reader, "item_category_id", null),
        //                    ItemCategoryName = DRE.GetNullableString(reader, "item_category_name", null),
        //                    ItemQualityId = DRE.GetNullableInt32(reader, "item_quality_id", null),
        //                    ItemQualityName = DRE.GetNullableString(reader, "item_quality", null),
        //                    UnitOfMeasurementId = DRE.GetNullableInt32(reader, "unit_of_measurement_id", null),
        //                    UnitCode = DRE.GetNullableString(reader, "unit_code", null),
        //                    HSNCode = DRE.GetNullableString(reader, "hsn_code", null),
        //                    OpeningUnit = DRE.GetNullableInt32(reader, "opening_unit", 0),
        //                    ReOrderLevel = DRE.GetNullableInt32(reader, "item_category_id", null),
        //                    IsSet = DRE.GetNullableBoolean(reader, "is_set", null),
        //                    BarcodeNo = DRE.GetNullableString(reader, "barcode_no", null),
        //                    guid = DRE.GetNullableGuid(reader, "row_guid", null),
        //                    SrNo = DRE.GetNullableInt64(reader, "sr_no", null),
        //                    ItemSetSubItems = itemSetSubItem.GetSetItemsByItemId(DRE.GetInt32(reader, "item_id"))
        //                };

        //                items.Add(item);
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //    finally
        //    {
        //        dbCommand = null;
        //    }

        //    return items;
        //}

        //public bool CheckItemIsExists(string itemName, Int32 brandId, Int32 itemQualityId)
        //{
        //    bool isExists = true;

        //    DbCommand dbCommand = null;

        //    try
        //    {
        //        using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.CheckItemNameIsExists))
        //        {
        //            database.AddInParameter(dbCommand, "@item_name", DbType.String, itemName);
        //            database.AddInParameter(dbCommand, "@brand_id", DbType.Int32, brandId);
        //            database.AddInParameter(dbCommand, "@item_quality_id", DbType.Int32, itemQualityId);

        //            using (IDataReader reader = database.ExecuteReader(dbCommand))
        //            {
        //                while (reader.Read())
        //                {
        //                    isExists = DRE.GetBoolean(reader, "is_item_exists");
        //                }
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //    finally
        //    {
        //        dbCommand = null;
        //    }

        //    return isExists;
        //}

        ///// <summary>
        ///// 
        ///// </summary>
        ///// <returns></returns>
        //public List<Entities.Item> GetItemsByBrandCategoryAndQuality()
        //{
        //    var items = new List<Entities.Item>();

        //    DbCommand dbCommand = null;

        //    try
        //    {
        //        using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetItemsByBrandCategoryAndQuality))
        //        {
        //            using (IDataReader reader = database.ExecuteReader(dbCommand))
        //            {
        //                while (reader.Read())
        //                {
        //                    var item = new Entities.Item
        //                    {
        //                        ItemId = DRE.GetNullableInt32(reader, "item_id", 0),
        //                        ItemName = DRE.GetNullableString(reader, "item_name", null)
        //                    };

        //                    items.Add(item);
        //                }
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //    finally
        //    {
        //        dbCommand = null;
        //    }

        //    return items;
        //}

        //public List<Entities.Item> GetItemsByBrandAndItemCategory(Int32 brandId, Int32 itemCategoryId)
        //{
        //    var items = new List<Entities.Item>();

        //    DbCommand dbCommand = null;

        //    try
        //    {
        //        using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetItemsByBrandAndItemCategory))
        //        {
        //            database.AddInParameter(dbCommand, "@brand_id", DbType.Int32, brandId);
        //            database.AddInParameter(dbCommand, "@item_category_id", DbType.Int32, itemCategoryId);

        //            using (IDataReader reader = database.ExecuteReader(dbCommand))
        //            {
        //                while (reader.Read())
        //                {
        //                    var item = new Entities.Item
        //                    {
        //                        ItemId = DRE.GetNullableInt32(reader, "item_id", 0),
        //                        ItemName = DRE.GetNullableString(reader, "item_name", null)
        //                    };

        //                    items.Add(item);
        //                }
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //    finally
        //    {
        //        dbCommand = null;
        //    }

        //    return items;
        //}

        ///// <summary>
        ///// 
        ///// </summary>
        ///// <param name="itemId"></param>
        ///// <returns></returns>
        //public Entities.Item GetItemById(Int32 itemId)
        //{
        //    var item = new Entities.Item();

        //    DbCommand dbCommand = null;

        //    using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetItemById)) {

        //        database.AddInParameter(dbCommand, "@item_id", DbType.Int32, itemId);

        //        using (IDataReader reader = database.ExecuteReader(dbCommand))
        //        {
        //            while (reader.Read())
        //            {
        //                var _item = new Entities.Item
        //                {
        //                    BrandId = DRE.GetNullableInt32(reader, "brand_id", null),
        //                    BrandName = DRE.GetNullableString(reader, "brand_name", null),
        //                    ItemId = DRE.GetNullableInt32(reader, "item_id", 0),
        //                    ItemCode = DRE.GetNullableString(reader, "item_code", null),
        //                    ItemName = DRE.GetNullableString(reader, "item_name", null),
        //                    ItemDesc = DRE.GetNullableString(reader, "item_desc", null),
        //                    ItemCategoryId = DRE.GetNullableInt32(reader, "item_category_id", null),
        //                    ItemCategoryName = DRE.GetNullableString(reader, "item_category_name", null),
        //                    ItemQualityId = DRE.GetNullableInt32(reader, "item_quality_id", null),
        //                    ItemQualityName = DRE.GetNullableString(reader, "item_quality", null),
        //                    UnitOfMeasurementId = DRE.GetNullableInt32(reader, "unit_of_measurement_id", null),
        //                    UnitCode = DRE.GetNullableString(reader, "unit_code", null),
        //                    HSNCode = DRE.GetNullableString(reader, "hsn_code", null),
        //                    OpeningUnit = DRE.GetNullableInt32(reader, "opening_unit", 0),
        //                    ReOrderLevel = DRE.GetNullableInt32(reader, "item_category_id", null),
        //                    IsSet = DRE.GetNullableBoolean(reader, "is_set", null),
        //                    BarcodeNo = DRE.GetNullableString(reader, "barcode_no", null),
        //                    guid = DRE.GetNullableGuid(reader, "row_guid", null)
        //                };

        //                item = _item;
        //            }
        //        }
        //    }

        //    return item;
        //}

        ///// <summary>
        ///// 
        ///// </summary>
        ///// <param name="itemName"></param>
        ///// <returns></returns>
        //public Entities.Item GetItemByName(string itemName)
        //{
        //    var item = new Entities.Item();

        //    DbCommand dbCommand = null;

        //    using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetItemByName))
        //    {
        //        database.AddInParameter(dbCommand, "@item_name", DbType.String, itemName);

        //        using (IDataReader reader = database.ExecuteReader(dbCommand))
        //        {
        //            while (reader.Read())
        //            {
        //                var _item = new Entities.Item
        //                {
        //                    BrandId = DRE.GetNullableInt32(reader, "brand_id", null),
        //                    BrandName = DRE.GetNullableString(reader, "brand_name", null),
        //                    ItemId = DRE.GetNullableInt32(reader, "item_id", 0),
        //                    ItemCode = DRE.GetNullableString(reader, "item_code", null),
        //                    ItemName = DRE.GetNullableString(reader, "item_name", null),
        //                    ItemDesc = DRE.GetNullableString(reader, "item_desc", null),
        //                    ItemCategoryId = DRE.GetNullableInt32(reader, "item_category_id", null),
        //                    ItemCategoryName = DRE.GetNullableString(reader, "item_category_name", null),
        //                    ItemQualityId = DRE.GetNullableInt32(reader, "item_quality_id", null),
        //                    ItemQualityName = DRE.GetNullableString(reader, "item_quality", null),
        //                    UnitOfMeasurementId = DRE.GetNullableInt32(reader, "unit_of_measurement_id", null),
        //                    UnitCode = DRE.GetNullableString(reader, "unit_code", null),
        //                    HSNCode = DRE.GetNullableString(reader, "hsn_code", null),
        //                    OpeningUnit = DRE.GetNullableInt32(reader, "opening_unit", 0),
        //                    ReOrderLevel = DRE.GetNullableInt32(reader, "item_category_id", null),
        //                    IsSet = DRE.GetNullableBoolean(reader, "is_set", null),
        //                    BarcodeNo = DRE.GetNullableString(reader, "barcode_no", null),
        //                    guid = DRE.GetNullableGuid(reader, "row_guid", null)
        //                };

        //                item = _item;
        //            }
        //        }
        //    }

        //    return item;
        //}

        ///// <summary>
        ///// 
        ///// </summary>
        ///// <returns></returns>
        //public Entities.Item GetItemDetailsByItemId(Int32 itemId)
        //{
        //    var itemDetails = new Entities.Item();

        //    DbCommand dbCommand = null;

        //    try
        //    {
        //        using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetItemDetailsByItemId))
        //        {
        //            database.AddInParameter(dbCommand, "@item_id", DbType.Int32, itemId);

        //            using (IDataReader reader = database.ExecuteReader(dbCommand))
        //            {
        //                while (reader.Read())
        //                {
        //                    var item = new Entities.Item
        //                    {
        //                        ItemId = DRE.GetNullableInt32(reader, "item_id", 0),
        //                        ItemName = DRE.GetNullableString(reader, "item_name", null),
        //                        HSNCode = DRE.GetNullableString(reader, "hsn_code", null),
        //                        UnitCode = DRE.GetNullableString(reader, "unit_code", null),
        //                        UnitOfMeasurementId = DRE.GetNullableInt32(reader, "unit_of_measurement_id", null),
        //                        IsSet = DRE.GetNullableBoolean(reader, "is_set", null),
        //                        IsSellAtNetRate = DRE.GetNullableBoolean(reader, "is_sell_at_net_rate", null),
        //                        PurchaseRate = DRE.GetNullableDecimal(reader, "purchase_rate", null),
        //                        SaleRate = DRE.GetNullableDecimal(reader, "sale_rate", null)
        //                    };

        //                    itemDetails = item;
        //                }
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //    finally
        //    {
        //        dbCommand = null;
        //    }

        //    return itemDetails;
        //}

        //public List<Entities.Item> SearchItemByItemName(string itemName)
        //{
        //    var items = new List<Entities.Item>();

        //    DbCommand dbCommand = null;

        //    try
        //    {
        //        using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.SearchItemsByItemName))
        //        {
        //            database.AddInParameter(dbCommand, "@item_name", DbType.String, itemName);

        //            using (IDataReader reader = database.ExecuteReader(dbCommand))
        //            {
        //                while (reader.Read())
        //                {
        //                    var item = new Entities.Item
        //                    {
        //                        ItemId = DRE.GetNullableInt32(reader, "item_id", 0),
        //                        ItemName = DRE.GetNullableString(reader, "item_name", null),
        //                        UnitCode = DRE.GetNullableString(reader, "unit_code", null),
        //                        UnitOfMeasurementId = DRE.GetNullableInt32(reader, "unit_of_measurement_id", null)
        //                    };

        //                    items.Add(item);
        //                }
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //    finally
        //    {
        //        dbCommand = null;
        //    }

        //    return items;
        //}
        
        ///// <summary>
        ///// 
        ///// </summary>
        ///// <param name="item"></param>
        ///// <returns></returns>
        //private Int32 UpdateItem(Entities.Item item)
        //{
        //    var itemId = 0;

        //    DbCommand dbCommand = null;

        //    try
        //    {
        //        using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdateItem))
        //        {
        //            database.AddInParameter(dbCommand, "@item_id", DbType.Int32, item.ItemId);
        //            database.AddInParameter(dbCommand, "@brand_id", DbType.Int32, item.BrandId);
        //            database.AddInParameter(dbCommand, "@item_category_id", DbType.Int32, item.ItemCategoryId);
        //            database.AddInParameter(dbCommand, "@item_name", DbType.String, item.ItemName);
        //            database.AddInParameter(dbCommand, "@item_desc", DbType.String, item.ItemDesc);
        //            database.AddInParameter(dbCommand, "@item_quality_id", DbType.Int32, item.ItemQualityId);
        //            database.AddInParameter(dbCommand, "@unit_of_measurement_id", DbType.Int32, item.UnitOfMeasurementId);
        //            database.AddInParameter(dbCommand, "@barcode_no", DbType.String, item.BarcodeNo);
        //            database.AddInParameter(dbCommand, "@hsn_code", DbType.String, item.HSNCode);
        //            database.AddInParameter(dbCommand, "@reorder_level", DbType.Int32, item.ReOrderLevel);
        //            database.AddInParameter(dbCommand, "@is_set", DbType.Boolean, item.IsSet);
        //            database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, item.ModifiedBy);
        //            database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, item.ModifiedByIP);

        //            database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

        //            itemId = database.ExecuteNonQuery(dbCommand);

        //            if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
        //            {
        //                itemId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
        //            }
        //        }
        //    }
        //    catch (Exception e)
        //    {
        //        throw e;
        //    }
        //    finally
        //    {
        //        dbCommand = null;
        //    }

        //    return itemId;
        //}

        //private Int32 UpdateItem(Entities.Item item, DbTransaction transaction)
        //{
        //    var itemId = 0;

        //    DbCommand dbCommand = null;

        //    try
        //    {
        //        using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdateItem))
        //        {
        //            database.AddInParameter(dbCommand, "@item_id", DbType.Int32, item.ItemId);
        //            database.AddInParameter(dbCommand, "@brand_id", DbType.Int32, item.BrandId);
        //            database.AddInParameter(dbCommand, "@item_category_id", DbType.Int32, item.ItemCategoryId);
        //            database.AddInParameter(dbCommand, "@item_name", DbType.String, item.ItemName);
        //            database.AddInParameter(dbCommand, "@item_desc", DbType.String, item.ItemDesc);
        //            database.AddInParameter(dbCommand, "@item_quality_id", DbType.Int32, item.ItemQualityId);
        //            database.AddInParameter(dbCommand, "@unit_of_measurement_id", DbType.Int32, item.UnitOfMeasurementId);
        //            database.AddInParameter(dbCommand, "@barcode_no", DbType.String, item.BarcodeNo);
        //            database.AddInParameter(dbCommand, "@hsn_code", DbType.String, item.HSNCode);
        //            database.AddInParameter(dbCommand, "@reorder_level", DbType.Int32, item.ReOrderLevel);
        //            database.AddInParameter(dbCommand, "@is_set", DbType.Boolean, item.IsSet);
        //            database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, item.ModifiedBy);
        //            database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, item.ModifiedByIP);

        //            database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

        //            itemId = database.ExecuteNonQuery(dbCommand, transaction);

        //            if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
        //            {
        //                itemId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
        //            }
        //        }
        //    }
        //    catch (Exception e)
        //    {
        //        throw e;
        //    }
        //    finally
        //    {
        //        dbCommand = null;
        //    }

        //    return itemId;
        //}

        //public Int32 SaveItem(Entities.Item item)
        //{
        //    var itemId = 0;

        //    var db = DBConnect.getDBConnection();

        //    using (DbConnection conn = db.CreateConnection())
        //    {
        //        conn.Open();

        //        using (DbTransaction transaction = conn.BeginTransaction())
        //        {
        //            try
        //            {
        //                var itemRateId = 0;
        //                var itemPictureId = 0;
        //                var itemSetSubItemId = 0;

        //                if (item != null)
        //                {
        //                    if (item.ItemId == null || item.ItemId == 0)
        //                    {
        //                        itemId = AddItem(item, transaction);
        //                    }
        //                    else
        //                    {
        //                        if (item.IsDeleted == true)
        //                        {
        //                            var result = DeleteItem(item, transaction);                                    

        //                            if (result)
        //                            {
        //                                itemId = Convert.ToInt32(item.ItemId);
        //                            }
        //                        }
        //                        else
        //                        {
        //                            if (item.ModifiedBy > 0 || item.ModifiedBy != null)
        //                            {
        //                                itemId = UpdateItem(item, transaction);
        //                            }
        //                        }
        //                    }

        //                    if (itemId > 0)
        //                    {
        //                        if (item.ItemRates != null)
        //                        {
        //                            if (item.ItemRates.Count > 0)
        //                            {
        //                                var customerCategoryItemRateId = 0;

        //                                ItemRate itemRateDL = new ItemRate();

        //                                foreach(Entities.ItemRate itemRate in item.ItemRates)
        //                                {
        //                                    itemRate.ItemId = itemId;

        //                                    itemRateId = itemRateDL.SaveItemRate(itemRate, transaction);

        //                                    if (itemRateId > 0)
        //                                    {
        //                                        if (itemRate.CustomerCategoryRates != null)
        //                                        {
        //                                            if (itemRate.CustomerCategoryRates.Count > 0)
        //                                            {
        //                                                foreach (Entities.ItemRateForCustomerCategory itemRateForCustomerCategory in itemRate.CustomerCategoryRates)
        //                                                {
        //                                                    itemRateForCustomerCategory.ItemRateId = itemRateId;

        //                                                    ItemRateForCustomerCategory ircc = new ItemRateForCustomerCategory();

        //                                                    customerCategoryItemRateId = ircc.SaveItemRateForCustomerCategory(itemRateForCustomerCategory, transaction);
        //                                                }
        //                                            }
        //                                        }
        //                                    }
        //                                }
        //                            }
        //                        }

        //                        if(item.ItemPictures != null)
        //                        {
        //                            if(item.ItemPictures.Count > 0)
        //                            {
        //                                ItemPicture itemPictureDL = new ItemPicture();

        //                                foreach(Entities.ItemPicture itemPicture in item.ItemPictures)
        //                                {
        //                                    itemPicture.ItemId = itemId;

        //                                    itemPictureId = itemPictureDL.SaveItemPicture(itemPicture, transaction);
        //                                }
        //                            }
        //                        }

        //                        if (item.ItemSetSubItems.Count > 0)
        //                        {
        //                            ItemSetSubItem issiDL = new ItemSetSubItem();

        //                            foreach (Entities.ItemSetSubItem itemSetSubItem in item.ItemSetSubItems)
        //                            {
        //                                itemSetSubItem.ItemId = itemId;

        //                                itemSetSubItemId = issiDL.SaveItemSet(itemSetSubItem, transaction);
        //                            }
        //                        }
        //                    }
        //                }

        //                transaction.Commit();
        //            }
        //            catch (Exception ex)
        //            {
        //                transaction.Rollback();
        //                throw ex;
        //            }
        //            finally
        //            {
        //                db = null;
        //            }
        //        }
        //    }

        //    return itemId;
        //}

        ////ItemSetSubItem issiDL = new ItemSetSubItem();

        ////Entities.ItemSetSubItem itemSetSubItem = new Entities.ItemSetSubItem();

        ////itemSetSubItem.ItemId = item.ItemId;
        ////itemSetSubItem.IsDeleted = true;
        ////itemSetSubItem.DeletedBy = item.DeletedBy;
        ////itemSetSubItem.DeletedByIP = item.DeletedByIP;

        ////issiDL.DeleteSetItemByItemId(itemSetSubItem, transaction);
        ////public Int32 SaveItem(Entities.Item item)
        ////{
        ////    var itemId = 0;

        ////    if (item.ItemId == null || item.ItemId == 0)
        ////    {
        ////        var result = CheckItemIsExists(item.ItemName, (int)item.BrandId, (int)item.ItemQualityId);

        ////        if (result == false)
        ////        {
        ////            itemId = AddItem(item);
        ////        }
        ////        else
        ////        {
        ////            itemId = -1;
        ////        }
        ////    }
        ////    else if (item.ModifiedBy != null || item.ModifiedBy > 0)
        ////    {
        ////        itemId = UpdateItem(item);
        ////    }
        ////    else if(item.IsDeleted == true)
        ////    {
        ////        var result = DeleteItem(item);
        ////    }

        ////    return itemId;
        ////}
    }
}
