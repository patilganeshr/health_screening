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
    public class DataSearchField
    {
        private readonly Database database;

        public DataSearchField()
        {
            database = DBConnect.getDBConnection();
        }

        public List<Entities.DataSearchField> GetSearchFields(Int32 pageId)
        {
            var searchFields = new List<Entities.DataSearchField>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetSearchFields))
                {
                    database.AddInParameter(dbCommand, "@page_id", DbType.Int32, pageId);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var searchField = new Entities.DataSearchField
                            {
                                SearchFieldId = DRE.GetNullableInt32(reader, "search_field_id", 0),
                                FieldName = DRE.GetNullableString(reader, "field_name", null),
                                FieldValue = DRE.GetNullableString(reader, "field_value", null),
                                ControlName = DRE.GetNullableString(reader, "control_name", null)
                            };

                            searchFields.Add(searchField);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return searchFields;
        }

        public List<Entities.DataSearchOperators> GetSearchOperators()
        {
            var searchOperators = new List<Entities.DataSearchOperators>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetSearchOperators))
                {
                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var opeartor = new Entities.DataSearchOperators
                            {
                                SearchOperatorId = DRE.GetNullableInt32(reader, "search_operator_id", 0),
                                FilterName = DRE.GetNullableString(reader, "filter_name", null),
                                FilterValue = DRE.GetNullableString(reader, "filter_value", null)
                            };

                            searchOperators.Add(opeartor);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return searchOperators;
        }

    }


}
