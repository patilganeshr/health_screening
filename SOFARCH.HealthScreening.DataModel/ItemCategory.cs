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
    public class ItemCategory
    {
        private readonly Database database;

        public ItemCategory()
        {
            database = DBConnect.getDBConnection();
        }

        private Int32 AddItemCategory(Entities.ItemCategory itemCategory)
        {
            var itemCategoryId = 0;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertItemCategory))
                {
                    database.AddInParameter(dbCommand, "@item_category_id", DbType.Int32, itemCategory.ItemCategoryId);
                    database.AddInParameter(dbCommand, "@item_category_name", DbType.String, itemCategory.ItemCategoryName);
                    database.AddInParameter(dbCommand, "@item_category_desc", DbType.String, itemCategory.ItemCategoryDesc);
                    database.AddInParameter(dbCommand, "@gst_category_id", DbType.Int32, itemCategory.GSTCategoryId);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, itemCategory.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, itemCategory.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    itemCategoryId = database.ExecuteNonQuery(dbCommand);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        itemCategoryId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                dbCommand = null;
            }

            return itemCategoryId;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="itemCategory"></param>
        /// <returns></returns>
        public bool DeleteItemCategory(Entities.ItemCategory itemCategory)
        {
            bool isDeleted = false;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeleteItemCategory))
                {
                    database.AddInParameter(dbCommand, "@item_category_id", DbType.Int32, itemCategory.ItemCategoryId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, itemCategory.DeletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, itemCategory.DeletedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    var result = database.ExecuteNonQuery(dbCommand);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        isDeleted = Convert.ToBoolean(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                dbCommand = null;
            }

            return isDeleted;

        }

        public List<Entities.ItemCategory> GetListOfAllItemCategories()
        {
            var itemCategories = new List<Entities.ItemCategory>();

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetListOfAllItemCategories))
                {
                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var itemCategory = new Entities.ItemCategory
                            {
                                ItemCategoryId = DRE.GetNullableInt32(reader, "item_category_id", 0),
                                ItemCategoryName = DRE.GetNullableString(reader, "item_category_name", null),
                                ItemCategoryDesc = DRE.GetNullableString(reader, "item_category_desc", null),
                                GSTCategoryName = DRE.GetNullableString(reader, "gst_category", null),
                                GSTCategoryId = DRE.GetNullableInt32(reader,"gst_category_id", null),
                                SrNo = DRE.GetNullableInt64(reader, "sr_no", null)
                            };

                            itemCategories.Add(itemCategory);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                dbCommand = null;
            }

            return itemCategories;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="itemCategoryId"></param>
        /// <returns></returns>
        public Entities.ItemCategory GetItemCategoryDetailsById(Int32 itemCategoryId)
        {
            var itemCategory = new Entities.ItemCategory();

            DbCommand dbCommand = null;

            using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetItemCategoryDetailsById))
            {
                database.AddInParameter(dbCommand, "@item_category_id", DbType.Int32, itemCategoryId);

                using (IDataReader reader = database.ExecuteReader(dbCommand))
                {
                    while (reader.Read())
                    {
                        var _itemCategory = new Entities.ItemCategory
                        {
                            ItemCategoryId = DRE.GetNullableInt32(reader, "item_category_id", null),
                            ItemCategoryName = DRE.GetNullableString(reader, "item_category_name", null),
                            ItemCategoryDesc = DRE.GetNullableString(reader, "item_category_desc", null)
                        };

                        itemCategory = _itemCategory;
                    }
                }
            }

            return itemCategory;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="itemCategoryName"></param>
        /// <returns></returns>
        public Entities.ItemCategory GetItemCategoryDetailsByName(string itemCategoryName)
        {
            var itemCategory = new Entities.ItemCategory();

            DbCommand dbCommand = null;

            using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetItemCategoryDetailsByName))
            {
                database.AddInParameter(dbCommand, "@item_category_name", DbType.String, itemCategoryName);

                using (IDataReader reader = database.ExecuteReader(dbCommand))
                {
                    while (reader.Read())
                    {
                        var _itemCategory = new Entities.ItemCategory
                        {
                            ItemCategoryId = DRE.GetNullableInt32(reader, "item_category_id", null),
                            ItemCategoryName = DRE.GetNullableString(reader, "item_category_name", null),
                            ItemCategoryDesc = DRE.GetNullableString(reader, "item_category_desc", null)
                        };

                        itemCategory = _itemCategory;
                    }
                }
            }

            return itemCategory;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="itemCategory"></param>
        /// <returns></returns>
        private Int32 UpdateItemCategory(Entities.ItemCategory itemCategory)
        {
            var itemCategoryId = 0;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdateItemCategory))
                {
                    database.AddInParameter(dbCommand, "@item_category_id", DbType.Int32, itemCategory.ItemCategoryId);
                    database.AddInParameter(dbCommand, "@item_category_name", DbType.String, itemCategory.ItemCategoryName);
                    database.AddInParameter(dbCommand, "@item_category_desc", DbType.String, itemCategory.ItemCategoryDesc);
                    database.AddInParameter(dbCommand, "@gst_category_id", DbType.Int32, itemCategory.GSTCategoryId);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, itemCategory.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, itemCategory.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    itemCategoryId = database.ExecuteNonQuery(dbCommand);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        itemCategoryId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                dbCommand = null;
            }

            return itemCategoryId;
        }

        public Int32 SaveItemCategory(Entities.ItemCategory itemCategory)
        {
            var itemCategoryId = 0;

            if (itemCategory.ItemCategoryId == null || itemCategory.ItemCategoryId == 0)
            {
                itemCategoryId = AddItemCategory(itemCategory);
            }
            else if (itemCategory.ModifiedBy != null || itemCategory.ModifiedBy > 0)
            {
                itemCategoryId = UpdateItemCategory(itemCategory);
            }
            else if (itemCategory.IsDeleted == true)
            {
                var result = DeleteItemCategory(itemCategory);

                if (result == true)
                {
                    itemCategoryId = 1;
                }
                else
                {
                    itemCategoryId = 0;
                }
            }

            return itemCategoryId;
        }
    }
}
