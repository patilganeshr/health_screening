<%@ Page Title="Purchase Bill" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="PurchaseBill.aspx.cs" Inherits="HealthScreeningApp.Transactions.PurchaseBill" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cpMaster" runat="server">

    <div class="action-toolbar">

        <a href="#" id="AddNewPurchaseBill"><i class="fa fa-plus fa-fw"></i>New</a>
        <a href="#" id="ShowPurchaseBillList"><i class="fa fa-list fa-fw"></i>List</a>
        <a href="#" id="ViewPurchaseBill"><i class="fa fa-eye fa-fw"></i>View</a>
        <a href="#" id="EditPurchaseBill"><i class="fa fa-edit fa-fw"></i>Edit</a>
        <a href="#" id="SavePurchaseBill"><i class="fa fa-save fa-fw"></i>Save</a>
        <a href="#" id="DeletePurchaseBill"><i class="fa fa-remove fa-fw"></i>Delete</a>
        <a href="#" id="PrintPurhcaseBillList"><i class="fa fa-print fa-fw"></i>Print</a>
        <a href="#" id="FilterPurchaseBill"><i class="fa fa-filter fa-fw"></i>Filter</a>
        <a href="#" id="ExportPurchaseBillList"><i class="fa fa-cog fa-fw"></i>Export</a>

    </div>

    <div class="st-content">

        <div class="container-fluid">

            <div class="page-header">
                <h3>Purchase Bill</h3>
            </div>

            <div id="Loader" class="loader-container">
                <!--There's the container that centers it-->
                <div class="spinner-frame">
                    <!--The background-->
                    <div class="spinner-cover"></div>
                    <!--The foreground-->
                    <div class="spinner-bar"></div>
                    <!--and the spinny thing-->
                </div>

            </div>
            <!-- .loader-container -->

            <div id="ViewMode">

                <div class="row">

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                        <!-- Filter Options -->

                        <div class="panel panel-default hide" id="SearchPurchaseBill">

                            <div class="panel-heading">

                                <div class="row">

                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                        <h4 class="panel-title panel-title-align-middle">Search Purchase Bills</h4>

                                    </div>

                                </div>

                            </div>

                            <div class="panel-body">

                                <div class="row">

                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                        <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12">
                                            <div class="form-group form-group-md">
                                                <label>Search Options</label>
                                                <select id="SearchOptions" class="form-control"></select>
                                            </div>
                                        </div>

                                        <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                                            <div class="form-group form-group-md">
                                                <label>Search Value</label>
                                                <input type="text" id="SearchValue" class="form-control" />
                                            </div>
                                        </div>

                                        <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                                            <div class="form-group form-group-md">
                                                <button type="button" id="Search" class="btn btn-info btn-md" style="margin-top: 26px;">Search</button>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <!-- Filter Options -->

                    </div>

                </div>

                <div class="row">

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                        <div class="panel panel-info">

                            <div class="panel-heading">
                                <h4 class="panel-title">List of Purchase Bills</h4>
                            </div>

                            <div class="panel-body">
                                <table id="PurchaseBillList" class="table table-condesed">
                                    <thead>
                                        <tr>
                                            <th class="text-center">Action</th>
                                            <th class="text-center">Supplier</th>
                                            <th class="text-center">Bill No.</th>
                                            <th class="text-center">Bill date</th>
                                            <th class="text-center">Qty</th>
                                            <th class="text-center">Amount</th>
                                            <th class="text-center">Fin Year</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>

                            <div class="panel-footer">
                                <div class="row">
                                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">Page 1 of 5</div>
                                    <div class="col-lg-8 col-lg-8 col-sm-8 col-xs-12">
                                        <ul class="pagination pagination-sm pull-right">
                                            <li class="page-item">
                                                <a class="page-link" href="#" tabindex="-1">Previous</a>
                                            </li>
                                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                                            <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>

            <div id="EditMode">

                <div class="row">

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                        <div class="panel panel-info">

                            <div class="panel-heading">
                                <h3 class="panel-title"></h3>
                            </div>

                            <div class="panel-body">

                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                    <div class="col-lg-1 col-md-1 col-sm-2 col-xs-12">
                                        <div class="form-group form-group-md">
                                            <label>Fin. Year</label>
                                            <select id="FinancialYear" class="form-control"></select>
                                        </div>
                                    </div>

                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>Purchase Bill No.</label>
                                            <input type="text" id="PurchaseBillNo" class="form-control" />
                                        </div>
                                    </div>

                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>Purchase Bill Date</label>
                                            <div class="input-group date input-group-md" id="PurchaseBillDateDatePicker">
                                                <input type="text" id="PurchaseBillDate" class="form-control" />
                                                <span class="input-group-addon">
                                                    <i class="fa fa-calendar"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">

                                        <div class="form-group form-group-sm">
                                            <label>Supplier</label>
                                            <input type="text" id="Vendor" class="form-control" />
                                        </div>

                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div id="SearchVendorList" class="autocompleteList"></div>
                                        </div>

                                    </div>

                                    <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>Remarks</label>
                                            <input type="text" id="Remarks" class="form-control" />
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>

                        <div class="panel panel-info">

                            <div class="panel-heading">
                                <h3 class="panel-title"></h3>
                            </div>

                            <div class="panel-body">

                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                    <div class="col-lg-6 col-md-6 col-sm-8 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>Search By Drug Name Or Drug Code</label>
                                            <input type="text" id="SearchDrugName" class="form-control" />
                                        </div>
                                    </div>

                                    <div class="pull-right">
                                        <h3 class="text-deep-orange-A200">Total Amount Rs. <span id="TotalBillAmount">0.00</span></h3>
                                    </div>

                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div id="SearchDrugList" class="autocompleteList"></div>
                                    </div>

                                </div>

                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div class="table-responsive" style="max-height: 300px; overflow: auto;">
                                        <table id="PurchaseBillItemList" class="table table-condensed">
                                            <thead>
                                                <tr>
                                                    <th class="text-center">Action</th>
                                                    <th class="text-center">Drug Code</th>
                                                    <th class="text-center">Drug Name</th>
                                                    <th class="text-center">Batch No.</th>
                                                    <th class="text-center">Pack 1</th>
                                                    <th class="text-center">Pack 2</th>
                                                    <th class="text-center">Free Qty</th>
                                                    <th class="text-center">Rate per Pack 1</th>
                                                    <th class="text-center">Expiry Date</th>
                                                    <th class="text-center">Tax Percent</th>
                                                    <th class="text-center">Tax Amount</th>
                                                    <th class="text-center">Item Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                            <tfoot></tfoot>
                                        </table>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div class="panel panel-info">

                            <div class="panel-body">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">


                                    <div class="form-horizontal">

                                        <div class="pull-right">

                                        <div class="form-group form-group-md">
                                            <label class="col-lg-6">Total Item Amount</label>
                                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                <input type="text" id="TotalItemAmount" class="form-control" readonly="readonly" />
                                            </div>
                                        </div>

                                        <div class="form-group form-group-md">
                                            <label class="col-lg-6">Purchase Bill Amount</label>
                                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                <input type="text" id="PurchaseBillAmount" class="form-control" />
                                            </div>
                                        </div>

                                        <div class="form-group form-group-md">
                                            <label class="col-lg-6">Adjusted Amount</label>
                                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                <input type="text" id="AdjustedAmount" class="form-control" readonly="readonly" />
                                            </div>
                                        </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

    <script type="text/javascript" src="../content/scripts/app/shared/default.js"></script>
    <script type="text/javascript" src="../content/scripts/app/purchase/purchase-bill.js"></script>
    <script type="text/javascript" src="../content/scripts/app/shared/masking.js"></script>

</asp:Content>
