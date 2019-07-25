using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SOFARCH.HealthScreening.Api.Controllers
{
    public class PettyCashController : ApiController
    {


        private readonly Business.Pettycash _Petty;
       
        
        public PettyCashController()
        {
            _Petty = new Business.Pettycash();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="employer"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("SavePettyCash")]
        public Int32 SavePettycash(Entities.Pettycash Petty)
        {
            return _Petty.SavePettycash(Petty);
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Route("GetAllPettyCash")]
        public List<Entities.Pettycash> GetAllPettyCashDocno()
        {
            return _Petty.GetAllPettyCashDocno();
        }


        [Route("GetAllAccountHead")]
        public List<Entities.AccountHead> GetAllAccountHead()
        {
            return _Petty.GetAllAccountHeads() ;
        }

        [HttpPost]
        [Route("printPettyCashReport")]
        public String printPettyCashReport(Entities.Pettycash Petty)
        {
            return _Petty.generateReportsss(Petty);
        }



    }
}