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
using SOFARCH.HealthScreening.Entities;

namespace SOFARCH.HealthScreening.DataModel
{
    public class DrugFormulation
    {
        private readonly Database database;

        public DrugFormulation()
        {
            database = DBConnect.getDBConnection();
        }

        public List<Entities.DrugFormulation> GetDrugFormulationIdAndCode()
        {
            var drugFormulations = new List<Entities.DrugFormulation>();

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetDrugFormulationIdAndCode))
                {
                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var drugFormulation = new Entities.DrugFormulation()
                            {
                                DrugFormulationId = DRE.GetNullableInt32(reader, "drug_formulation_id", 0),
                                DrugFormulationCode = DRE.GetNullableString(reader, "drug_formulation_code", null)
                            };

                            drugFormulations.Add(drugFormulation);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return drugFormulations;

        }

    }
}
