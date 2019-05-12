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
    public class AddressType
    {
        private readonly Database database;

        public AddressType()
        {
            database = DBConnect.getDBConnection();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="addressType"></param>
        /// <returns></returns>
        private Int32 AddAddressType(Entities.AddressType addressType)
        {
            var addressTypeId = 0;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertAddressType))
                {
                    database.AddInParameter(dbCommand, "@address_type_id", DbType.Int32, addressType.AddressTypeId);
                    database.AddInParameter(dbCommand, "@address_type", DbType.String, addressType.AddressTypeName);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, addressType.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, addressType.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    addressTypeId = database.ExecuteNonQuery(dbCommand);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        addressTypeId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
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

            return addressTypeId;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="addressType"></param>
        /// <returns></returns>
        public bool DeleteAddressType(Entities.AddressType addressType)
        {
            bool isDeleted = false;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeleteAddressType))
                {
                    database.AddInParameter(dbCommand, "@address_type_id", DbType.Int32, addressType.AddressTypeId);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, addressType.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, addressType.ModifiedByIP);

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

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<Entities.AddressType> GetAllAddressTypes()
        {
            var addressTypes = new List<Entities.AddressType>();

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetAllAddressTypes))
                {

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var addressType = new Entities.AddressType
                            {
                                AddressTypeId = DRE.GetNullableInt32(reader, "address_type_id", 0),
                                AddressTypeName = DRE.GetNullableString(reader, "address_type", null),
                                SrNo = DRE.GetNullableInt64(reader, "sr_no", null)
                            };

                            addressTypes.Add(addressType);
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

            return addressTypes;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="addressTypeId"></param>
        /// <returns></returns>
        public Entities.AddressType GetAddressTypeById(Int32 addressTypeId)
        {
            var addressType = new Entities.AddressType();

            DbCommand dbCommand = null;

            using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetAddressTypeDetailsById))
            {
                database.AddInParameter(dbCommand, "@address_type_id", DbType.Int32, addressTypeId);

                using (IDataReader reader = database.ExecuteReader(dbCommand))
                {
                    while (reader.Read())
                    {
                        var _addressType = new Entities.AddressType
                        {
                            AddressTypeId = DRE.GetNullableInt32(reader, "address_type_id", 0),
                            AddressTypeName = DRE.GetNullableString(reader, "address_type", null)
                        };

                        addressType = _addressType;
                    }
                }
            }

            return addressType;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="addressTypeName"></param>
        /// <returns></returns>
        public Entities.AddressType GetAddressTypeByName(string addressTypeName)
        {
            var addressType = new Entities.AddressType();

            DbCommand dbCommand = null;

            using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetAddressTypeDetailsByName))
            {
                database.AddInParameter(dbCommand, "@address_type", DbType.String, addressTypeName);

                using (IDataReader reader = database.ExecuteReader(dbCommand))
                {
                    while (reader.Read())
                    {
                        var _addressType = new Entities.AddressType
                        {
                            AddressTypeId = DRE.GetNullableInt32(reader, "address_type_id", 0),
                            AddressTypeName = DRE.GetNullableString(reader, "address_type", null)
                        };

                        addressType = _addressType;
                    }
                }
            }

            return addressType;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="addressType"></param>
        /// <returns></returns>
        private Int32 UpdateAddressType(Entities.AddressType addressType)
        {
            var addressTypeId = 0;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdateAddressType))
                {
                    database.AddInParameter(dbCommand, "@address_type_id", DbType.Int32, addressType.AddressTypeId);
                    database.AddInParameter(dbCommand, "@address_type", DbType.String, addressType.AddressTypeName);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, addressType.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, addressType.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    addressTypeId = database.ExecuteNonQuery(dbCommand);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        addressTypeId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
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

            return addressTypeId;
        }

        public Int32 SaveAddressType(Entities.AddressType addressType)
        {
            if (addressType.AddressTypeId == null || addressType.AddressTypeId == 0)
            {
                return AddAddressType(addressType);
            }
            else
            {
                return UpdateAddressType(addressType);
            }
        }
    }
}
