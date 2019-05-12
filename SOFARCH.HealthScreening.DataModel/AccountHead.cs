using SOFARCH.HealthScreening.Entities;
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
    public class AccountHead : BaseEntity
    {
        private readonly Database database;

        public AccountHead()
        {
            database = DBConnect.getDBConnection();
        }

        private Int32 AddAccountHead(Entities.AccountHead accountHead)
        {
            var accountHeadId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertAccountHead))
                {
                    database.AddInParameter(dbCommand, "@account_head_id", DbType.Int32, accountHead.AccountHeadId);
                    database.AddInParameter(dbCommand, "@account_head_name", DbType.String, accountHead.AccountHeadName);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, accountHead.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, accountHead.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    accountHeadId = database.ExecuteNonQuery(dbCommand);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        accountHeadId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return accountHeadId;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="accountHead"></param>
        /// <returns></returns>
        private bool DeleteAccountHead(Entities.AccountHead accountHead)
        {
            var isDeleted = false;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeleteAccountHead))
                {
                    database.AddInParameter(dbCommand, "@account_head_id", DbType.Int32, accountHead.AccountHeadId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, accountHead.DeletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, accountHead.DeletedByIP);

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

            return isDeleted;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="accountHead"></param>
        /// <returns></returns>
        private Int32 UpdateAccountHead(Entities.AccountHead accountHead)
        {
            var accountHeadId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdatetAccountHead))
                {
                    database.AddInParameter(dbCommand, "@account_head_id", DbType.Int32, accountHead.AccountHeadId);
                    database.AddInParameter(dbCommand, "@account_head_name", DbType.String, accountHead.AccountHeadName);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, accountHead.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, accountHead.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    accountHeadId = database.ExecuteNonQuery(dbCommand);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        accountHeadId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return accountHeadId;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<Entities.AccountHead> GetAllAccountHeads()
        {
            var accountHeads = new List<Entities.AccountHead>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetAllAccountHeads))
                {
                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var accountHead = new Entities.AccountHead
                            {
                                AccountHeadId = DRE.GetNullableInt32(reader, "account_head_id", 0),
                                AccountHeadName = DRE.GetNullableString(reader, "account_head_name", null)
                            };

                            accountHeads.Add(accountHead);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return accountHeads;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="accountHeadId"></param>
        /// <returns></returns>
        public Entities.AccountHead GetAccountHeadById(Int32 accountHeadId)
        {
            var accountHeadDetails = new Entities.AccountHead();

            using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetAccountHeadById))
            {
                database.AddInParameter(dbCommand, "@account_head_id", DbType.Int32, accountHeadId);

                using (IDataReader reader = database.ExecuteReader(dbCommand))
                {
                    while (reader.Read())
                    {
                        var accountHead = new Entities.AccountHead
                        {
                            AccountHeadId = DRE.GetNullableInt32(reader, "account_head_id", 0),
                            AccountHeadName = DRE.GetNullableString(reader, "account_head_name", null)                            
                        };

                        accountHeadDetails = accountHead;
                    }
                }
            }

            return accountHeadDetails;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="accountHeadName></param>
        /// <returns></returns>
        public Entities.AccountHead GetAccountHeadByName(string accountHeadName)
        {
            var accountHeadDetails = new Entities.AccountHead();
                       
            using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetAccountHeadById))
            {
                database.AddInParameter(dbCommand, "@account_head_name", DbType.String, accountHeadName);

                using (IDataReader reader = database.ExecuteReader(dbCommand))
                {
                    while (reader.Read())
                    {
                        var accountHead = new Entities.AccountHead
                        {
                            AccountHeadId = DRE.GetNullableInt32(reader, "account_head_id", 0),
                            AccountHeadName = DRE.GetNullableString(reader, "account_head_name", null)                            
                        };

                        accountHeadDetails = accountHead;
                    }
                }
            }

            return accountHeadDetails;
        }

        public List<Entities.AccountHead> SearchAllAccountHeads()
        {
            var accountHeads = new List<Entities.AccountHead>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.SearchAllAccountHeads))
                {
                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var accountHead = new Entities.AccountHead
                            {
                                AccountHeadId = DRE.GetNullableInt32(reader, "account_head_id", 0),
                                AccountHeadName = DRE.GetNullableString(reader, "account_head_name", null)
                            };

                            accountHeads.Add(accountHead);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return accountHeads;
        }

        public List<Entities.AccountHead> SearchAccountHeadByName(string accountHeadName)
        {
            var accountHeads = new List<Entities.AccountHead>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.SearchAccountHeadByName))
                {
                    database.AddInParameter(dbCommand, "@account_head_name", DbType.String, accountHeadName);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var accountHead = new Entities.AccountHead
                            {
                                AccountHeadId = DRE.GetNullableInt32(reader, "account_head_id", 0),
                                AccountHeadName = DRE.GetNullableString(reader, "account_head_name", null)
                            };

                            accountHeads.Add(accountHead);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return accountHeads;
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="drugGroup"></param>
        /// <returns></returns>
        public Int32 SaveAccountHead(Entities.AccountHead accountHead)
        {
            var accountHeadId = 0;

            if (accountHead.AccountHeadId == null || accountHead.AccountHeadId == 0)
            {
                accountHeadId = AddAccountHead(accountHead);

                return accountHeadId;
            }
            else
            {
                if (accountHead.IsDeleted == true)
                {
                    var result = DeleteAccountHead(accountHead);

                    if (result == true)
                    {
                        accountHeadId = 1;
                    }
                }
                else
                {
                    accountHeadId = UpdateAccountHead(accountHead);
                }
            }

            return accountHeadId;

        }

    }
}
