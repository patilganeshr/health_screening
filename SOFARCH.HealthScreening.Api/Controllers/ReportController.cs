using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SOFARCH.HealthScreening.API.Controllers
{
    public class ReportController : ApiController
    {
        //private readonly Business.StockReport _stockReport;
        //private readonly Business.StockInTransit _stockInTransit;
        //private readonly Business.SaleQtyReport _saleQtyReport;
        //private readonly Business.SalesmanwiseReport _salesmanwiseReport;
        //private readonly Business.JobWorkReport _jobWorkReport;
        //private readonly Business.SalesValueReportInSalesPeriod _salesValueReportInSalesPeriod;

        public ReportController()
        {
            //_stockReport = new Business.StockReport();
            //_stockInTransit = new Business.StockInTransit();
            //_saleQtyReport = new Business.SaleQtyReport();
            //_salesmanwiseReport = new Business.SalesmanwiseReport();
            //_jobWorkReport = new Business.JobWorkReport();
        }

        //[Route("GetStockAsOnDate")]
        //public List<Entities.StockReport> GetStockAsOnDate()
        //{
        //    return _stockReport.GetStockAsOnDate();
        //}

        //[Route("GetStockAsOnDateByItemwiseWithPurchaseCost")]
        //public List<Entities.StockReport> GetStockAsOnDateByItemwiseWithPurchaseCost()
        //{
        //    return _stockReport.GetStockAsOnDateByItemwiseWithPurchaseCost();
        //}

        //[Route("GetStockInTransitDetails")]
        //public List<Entities.StockInTransit> GetStockInTransitDetails()
        //{
        //    return _stockInTransit.GetStockInTransitDetails();
        //}

        ///// <summary>
        ///// Get Stock Report as on date
        ///// </summary>
        ///// <returns>Will return a list of Stock Report.</returns>
        //[Route("GetStockOfAllItems")]
        //public List<Entities.StockReport> GetStockOfAllItems()
        //{
        //    return _stockReport.GetStockOfAllItems();
        //}

        ///// <summary>
        ///// Get Stock Report By Item Id
        ///// </summary>
        ///// <param name="itemId">Required an integer value as Item Id</param>
        ///// <returns>Will return a list of Stock Report.</returns>
        //[Route("GetStockByItemId/{itemId}")]
        //public List<Entities.StockReport> GetStockByItemId(Int32 itemId)
        //{
        //    return _stockReport.GetStockByItemId(itemId);
        //}

        ///// <summary>
        ///// Get Stock Report By Item Name
        ///// </summary>
        ///// <param name="itemName">Required a string value as Item Name.</param>
        ///// <returns>Will return a list of Stock Report.</returns>
        //[Route("GetStockByItemName/{itemName}")]
        //public List<Entities.StockReport> GetStockByItemName(string itemName)
        //{
        //    return _stockReport.GetStockByItemName(itemName);
        //}

        ///// <summary>
        ///// Get Stock Report By Item Category Wise
        ///// </summary>
        ///// <returns>Will return a list of Stock Report.</returns>
        //[Route("GetStockItemCategoryWise")]
        //public List<Entities.StockReport> GetStockItemCategoryWise()
        //{
        //    return _stockReport.GetStockItemCategoryWise();
        //}

        ///// <summary>
        ///// Get Stock Report Item Categorywise By Item Category Id
        ///// </summary>
        ///// <param name="itemCategoryId">Required an integer value as Item Category Id.</param>
        ///// <returns>Will return a list of Stock Report Entity.</returns>
        //[Route("GetStockItemCategoryWiseByItemCategoryId/{itemCategoryId}")]
        //public List<Entities.StockReport> GetStockItemCategoryWiseByItemCategoryId(Int32 itemCategoryId)
        //{
        //    return _stockReport.GetStockItemCategoryWiseByItemCategoryId(itemCategoryId);
        //}

        ///// <summary>
        ///// Get Stock Report Item Category Wise and Item Wise
        ///// </summary>
        ///// <returns>Will return a list of Stock Report Entity.</returns>
        //[Route("GetStockItemCategoryWiseAndItemQualityWise")]
        //public List<Entities.StockReport> GetStockItemCategoryWiseAndItemQualityWise()
        //{
        //    return _stockReport.GetStockItemCategoryWiseAndItemQualityWise();
        //}

        ///// <summary>
        ///// Get Stock Location Wise Item Quality Wise and Item Wise
        ///// </summary>
        ///// <returns>Will return a list of Stock Report Entity.</returns>
        //[Route("GetStockLocationWiseItemQualitWiseAndItemWise")]
        //public List<Entities.StockReport> GetStockLocationWiseItemQualitWiseAndItemWise()
        //{
        //    return _stockReport.GetStockLocationWiseItemQualitWiseAndItemWise();
        //}

        ///// <summary>
        ///// Get Stock Location Wise Item Wise By Item Id
        ///// </summary>
        ///// <param name="itemId">Required an integer value of Item Id.</param>
        ///// <returns>Will return a list of Stock Report Entity.</returns>
        //[Route("GetStockLocationWiseItemWiseByItemId/{itemId}")]
        //public List<Entities.StockReport> GetStockLocationWiseItemWiseByItemId(Int32 itemId)
        //{
        //    return _stockReport.GetStockLocationWiseItemWiseByItemId(itemId);
        //}

        ///// <summary>
        ///// Get Stock Report Location Wise Item Quality Wise and Item Wise
        ///// </summary>
        ///// <returns>Will return a list of Stock Report Entity.</returns>
        //[Route("GetStockLocationWiseAndItemWiseByLoctionId/{locationId}")]
        //public List<Entities.StockReport> GetStockLocationWiseAndItemWiseByLoctionId(Int32 locationId)
        //{
        //    return _stockReport.GetStockLocationWiseAndItemWiseByLoctionId(locationId);
        //}


        //[Route("GetSaleQtyOfAllItemCategories")]
        //public List<Entities.SaleQtyReport> GetSaleQtyOfAllItemCategories()
        //{
        //    return _saleQtyReport.GetSaleQtyOfAllItemCategories();
        //}

        //[Route("GetSaleQtyOfAllItemCategoriesAndItemQualities")]
        //public List<Entities.SaleQtyReport> GetSaleQtyOfAllItemCategoriesAndItemQualities()
        //{
        //    return _saleQtyReport.GetSaleQtyOfAllItemCategoriesAndItemQualities();
        //}

        //[Route("GetSaleQtyOfAllItemCategoriesItemQualitiesAndItem")]
        //public List<Entities.SaleQtyReport> GetSaleQtyOfAllItemCategoriesItemQualitiesAndItem()
        //{
        //    return _saleQtyReport.GetSaleQtyOfAllItemCategoriesItemQualitiesAndItem();
        //}

        //[HttpPost]
        //[Route("GetDailySalesQtyReport")]
        //public List<Entities.SalesmanwiseReport> GetDailySalesQtyReport(Entities.SalesmanwiseReport salesmanwiseReport)
        //{
        //    int? salesmanId = (int)salesmanwiseReport.SalesmanId;
        //    string salesBillDate = salesmanwiseReport.SalesBillDate;

        //    if (salesmanId == -1) { salesmanId = null; }
        //    if (salesBillDate == "") { salesBillDate = null; }

        //    return _salesmanwiseReport.GetDailySalesQtyReport(salesmanId, salesBillDate);
        //}

        //[HttpPost]
        //[Route("GetDailySalesQtyReportWithSaleRateAndPurchaseRate")]
        //public List<Entities.SalesmanwiseReport> GetDailySalesQtyReportWithSaleRateAndPurchaseRate(Entities.SalesmanwiseReport salesmanwiseReport)
        //{
        //    int? salesmanId = (int)salesmanwiseReport.SalesmanId;
        //    string salesBillDate = salesmanwiseReport.SalesBillDate;

        //    if (salesmanId == -1) { salesmanId = null; }
        //    if (salesBillDate == "") { salesBillDate = null; }

        //    return _salesmanwiseReport.GetDailySalesQtyReportWithSaleRateAndPurchaseRate(salesmanId, salesBillDate);
        //}


        //[HttpPost]
        //[Route("GetSalesmanwiseItemwiseDailySalesValueReport")]
        //public List<Entities.SalesmanwiseReport> GetSalesmanwiseItemwiseDailySalesValueReport(Entities.SalesmanwiseReport salesmanwiseReport)
        //{
        //    int? salesmanId = (int)salesmanwiseReport.SalesmanId;
        //    string fromBillDate = salesmanwiseReport.FromBillDate;
        //    string toBillDate = salesmanwiseReport.ToBillDate;

        //    if (salesmanId == -1) { salesmanId = null; }
        //    if (fromBillDate == "") { fromBillDate = null; }
        //    if (toBillDate == "") { toBillDate = null; }

        //    return _salesmanwiseReport.GetSalesmanwiseItemwiseDailySalesValueReport(salesmanId, fromBillDate, toBillDate);
        //}

        //[Route("GetJobWorkItemsSentToKaragir")]
        //public List<Entities.JobWorkItemSentToKaragir> GetJobWorkItemsSentToKaragir()
        //{
        //    return _jobWorkReport.GetJobWorkItemsSentToKaragir();
        //}

        //[Route("GetJobWorkItemsBalanceQtyDetails")]
        //public List<Entities.JobWorkItemsBalanceQtyReport> GetJobWorkItemsBalanceQtyDetails()
        //{
        //    return _jobWorkReport.GetJobWorkItemsBalanceQtyDetails();
        //}

        //[Route("GetSalesByValueReportInSalePeriod")]
        //public List<Entities.SalesByValueReportInSalesPeriod> GetSalesByValueReportInSalePeriod(Entities.SalesByValueReportInSalesPeriod salesByValueReport)
        //{
        //    return _salesValueReportInSalesPeriod.GetSalesValueReport(salesByValueReport);
        //}


    }
}
