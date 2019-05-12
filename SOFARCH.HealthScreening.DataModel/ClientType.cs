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
    public class ClientType
    {
        private readonly Database database;

        public ClientType()
        {
            database = DBConnect.getDBConnection();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientType"></param>
        /// <returns></returns>
        private Int32 AddClientType(Entities.ClientType clientType)
        {
            var clientTypeId = 0;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertClientType))
                {
                    database.AddInParameter(dbCommand, "@client_type_id", DbType.Int32, clientType.ClientTypeId);
                    database.AddInParameter(dbCommand, "@client_type", DbType.String, clientType.ClientTypeName);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, clientType.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, clientType.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    clientTypeId = database.ExecuteNonQuery(dbCommand);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        clientTypeId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
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

            return clientTypeId;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientType"></param>
        /// <returns></returns>
        public bool DeleteClientType(Entities.ClientType clientType)
        {
            bool isDeleted = false;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeleteClientType))
                {
                    database.AddInParameter(dbCommand, "@client_type_id", DbType.Int32, clientType.ClientTypeId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, clientType.DeletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, clientType.DeletedByIP);

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
        public List<Entities.ClientType> GetAllClientTypes()
        {
            var clientTypes = new List<Entities.ClientType>();

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetAllClientTypes))
                {
                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var clientType = new Entities.ClientType
                            {
                                ClientTypeId = DRE.GetNullableInt32(reader, "client_type_id", 0),
                                ClientTypeName = DRE.GetNullableString(reader, "client_type", null),
                                SrNo = DRE.GetNullableInt64(reader, "sr_no", null)
                            };

                            clientTypes.Add(clientType);
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

            return clientTypes;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientTypeId"></param>
        /// <returns></returns>
        public Entities.ClientType GetClientTypeById(Int32 clientTypeId)
        {
            var clientType = new Entities.ClientType();

            DbCommand dbCommand = null;

            using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetClientTypeById))
            {
                database.AddInParameter(dbCommand, "@client_type_id", DbType.Int32, clientTypeId);

                using (IDataReader reader = database.ExecuteReader(dbCommand))
                {
                    while (reader.Read())
                    {
                        var _clientType = new Entities.ClientType
                        {
                            ClientTypeId = DRE.GetNullableInt32(reader, "client_type_id", 0),
                            ClientTypeName = DRE.GetNullableString(reader, "client_type", null)
                        };

                        clientType = _clientType;
                    }
                }
            }

            return clientType;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientTypeName"></param>
        /// <returns></returns>
        public Entities.ClientType GetClientTypeByName(string clientTypeName)
        {
            var clientType = new Entities.ClientType();

            DbCommand dbCommand = null;

            using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetClientTypeByName))
            {
                database.AddInParameter(dbCommand, "@client_type", DbType.String, clientTypeName);

                using (IDataReader reader = database.ExecuteReader(dbCommand))
                {
                    while (reader.Read())
                    {
                        var _clientType = new Entities.ClientType
                        {
                            ClientTypeId = DRE.GetNullableInt32(reader, "client_type_id", 0),
                            ClientTypeName = DRE.GetNullableString(reader, "client_type", null)
                        };

                        clientType = _clientType;
                    }
                }
            }

            return clientType;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientType"></param>
        /// <returns></returns>
        private Int32 UpdateClientType(Entities.ClientType clientType)
        {
            var clientTypeId = 0;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdateClientType))
                {
                    database.AddInParameter(dbCommand, "@client_type_id", DbType.Int32, clientType.ClientTypeId);
                    database.AddInParameter(dbCommand, "@client_type", DbType.String, clientType.ClientTypeName);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, clientType.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, clientType.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    clientTypeId = database.ExecuteNonQuery(dbCommand);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        clientTypeId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
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

            return clientTypeId;
        }

        public Int32 SaveClientType(Entities.ClientType clientType)
        {
            var clientTypeId = 0;

            if (clientType.ClientTypeId == null || clientType.ClientTypeId == 0)
            {
                clientTypeId = AddClientType(clientType);
            }
            else if (clientType.ModifiedBy == null || clientType.ModifiedBy > 0)
            {
                clientTypeId = UpdateClientType(clientType);
            }
            else if(clientType.IsDeleted == true)
            {
                var result = DeleteClientType(clientType);
            }

            return clientTypeId;
        }
    }
}
