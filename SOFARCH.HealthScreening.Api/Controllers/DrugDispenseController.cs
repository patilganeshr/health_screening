﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SOFARCH.HealthScreening.Api.Controllers
{
    public class DrugDispenseController : ApiController
    {
        private readonly Business.DrugDispense _drugDispense;

        public DrugDispenseController()
        {
            _drugDispense = new Business.DrugDispense();
        }

        [Route("GetDrugDetailsByDrugId/{drugId}")]
        public Entities.DrugDispenseDrugUtilisation GetDrugDetailsByDrugId(Int32 drugId)
        {
            return _drugDispense.GetDrugDetailsByDrugId(drugId);
        }

        [HttpPost]
        [Route("SearchDrugDispense")]
        public List<Entities.DrugDispense> SearchDrguDispense(Entities.DrugDispense drugDispense)
        {
            return _drugDispense.SearchDrguDispense(drugDispense);
        }

        [HttpPost]
        [Route("SaveDrugDispenseDetails")]
        public Int32 SaveDrugDispenseDetails(Entities.DrugDispense drugDispense)
        {
            return _drugDispense.SaveDrugDispenseDetails(drugDispense);
        }

    }
}
