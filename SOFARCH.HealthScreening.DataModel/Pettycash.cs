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
    public class Pettycash
    {
        private readonly Database database;

        public Pettycash()
        {
            database = DBConnect.getDBConnection();
        }

        /// <returns></returns>
        private Int32 AddPettycash(Entities.Pettycash Petty)
        {
            var PettycashId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertPettycase))
                {

                    database.AddInParameter(dbCommand, "@docno", DbType.String, Petty.DocNo);
                    database.AddInParameter(dbCommand, "@dates", DbType.Date, Petty.EntryDate);
                    database.AddInParameter(dbCommand, "@daterange", DbType.String, Petty.DateRange);
                    database.AddInParameter(dbCommand, "@accountheadid", DbType.Int32, Petty.AccountHeadId);
                    database.AddInParameter(dbCommand, "@nameofsupplier", DbType.String, Petty.Supplier);
                    database.AddInParameter(dbCommand, "@voucherno", DbType.String, Petty.VoucherNo);
                    database.AddInParameter(dbCommand, "@Amount", DbType.String, Petty.Amount);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, Petty.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, Petty.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    PettycashId = database.ExecuteNonQuery(dbCommand);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        PettycashId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return PettycashId;
        }


        private Int32 UpdatePettycash(Entities.Pettycash Petty)
        {
            var PettycashId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdatePettycase))
                {

                    database.AddInParameter(dbCommand, "@pettycase_id", DbType.Int32, Petty.PettycaseId);
                    database.AddInParameter(dbCommand, "@docno", DbType.String, Petty.DocNo);
                    database.AddInParameter(dbCommand, "@dates", DbType.Date, Petty.EntryDate);
                    database.AddInParameter(dbCommand, "@daterange", DbType.String, Petty.DateRange);
                    database.AddInParameter(dbCommand, "@accountheadid", DbType.Int32, Petty.AccountHeadId);
                    database.AddInParameter(dbCommand, "@nameofsupplier", DbType.String, Petty.Supplier);
                    database.AddInParameter(dbCommand, "@voucherno", DbType.String, Petty.VoucherNo);
                    database.AddInParameter(dbCommand, "@Amount", DbType.String, Petty.Amount);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, Petty.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, Petty.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    PettycashId = database.ExecuteNonQuery(dbCommand);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        PettycashId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return PettycashId;
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="employer"></param>
        /// <returns></returns>
        public bool DeletePettyCash(Entities.Pettycash Petty)
        {
            bool isDeleted = false;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.Deletepettycase ))
                {
                    database.AddInParameter(dbCommand, "@pettycase_id", DbType.Int32, Petty.PettycaseId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, Petty.DeletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, Petty.DeletedByIP);

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
        /// /
        /// </summary>
        /// <returns></returns>
        public List<Entities.Pettycash> GetAllPettyCashDocno()
        {
            var Pettys = new List<Entities.Pettycash>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetListOfAllPettycase))
                {

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var Petty = new Entities.Pettycash
                            {

                                PettycaseId = DRE.GetNullableInt32(reader, "pettycase_id", 0),
                                DocNo = DRE.GetNullableString(reader, "docno", null),
                                EntryDate = DRE.GetNullableString(reader, "Date", null),
                                DateRange = DRE.GetNullableString(reader, "daterange", null),
                                AccountHead = DRE.GetNullableString(reader, "account_head_name", null),
                                Supplier = DRE.GetNullableString(reader, "nameofsupplier", null),
                                VoucherNo = DRE.GetNullableString(reader, "voucherno", null),
                                Amount = DRE.GetNullableDecimal(reader, "Amount", 0),
                                guid = DRE.GetNullableGuid(reader, "row_guid", null),
                                SrNo = DRE.GetNullableInt64(reader, "sr_no", null)


                            };

                            Pettys.Add(Petty);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Pettys;
        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="employerId"></param>
        /// <returns></returns>
        public Entities.Pettycash GetPettycashDetailsById(Int32 employerId)
        {
            var Petty = new Entities.Pettycash();

            using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetEmployerDetailsById))
            {
                database.AddInParameter(dbCommand, "@employer_id", DbType.Int32, employerId);

                using (IDataReader reader = database.ExecuteReader(dbCommand))
                {
                    while (reader.Read())
                    {
                        var _Petty = new Entities.Pettycash
                        {
                            //    EmployerId = DRE.GetNullableInt32(reader, "employer_id", null),
                            //    EmployerName = DRE.GetNullableString(reader, "employer_name", null),
                            //    EmployerAddress = DRE.GetNullableString(reader, "employer_address", null),
                            //    CountryId = DRE.GetNullableInt32(reader, "country_id", null),
                            //    StateId = DRE.GetNullableInt32(reader, "state_id", null),
                            //    CityId = DRE.GetNullableInt32(reader, "city_id", null),
                            //    PinCode = DRE.GetNullableString(reader, "pin_code", null),
                            //    Website = DRE.GetNullableString(reader, "website", null),
                            //    GSTINNo = DRE.GetNullableString(reader, "gstin_no", null)
                        };

                        Petty = _Petty;
                    }
                }
            }

            return Petty;
        }


  

        public Int32 SavePettycash(Entities.Pettycash Petty)
        {
            var PettyCaseId = 0;

            if (Petty == null || Petty.PettycaseId == 0)
            {
                PettyCaseId = AddPettycash(Petty);
            }
            else if (Petty.ModifiedBy != null || Petty.ModifiedBy > 0)
            {
                PettyCaseId = UpdatePettycash(Petty);
            }
            else if (Petty.DeletedBy  != null || Petty.DeletedBy > 0)
            {
                var result = DeletePettyCash(Petty);
                if (result == true)
                {
                    PettyCaseId = 1;
                }
           }

            return PettyCaseId;
        }




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


    }
}
