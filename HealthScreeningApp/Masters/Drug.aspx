<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Drug.aspx.cs" Inherits="HealthScreeningApp.Masters.Drug" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cpMaster" runat="server">

    <div class="action-toolbar">

        <a href="#" id="AddNewDrug"><i class="fa fa-plus fa-fw"></i>New</a>
        <a href="#" id="ShowDrugList"><i class="fa fa-list fa-fw"></i>List</a>
        <a href="#" id="ViewDrug"><i class="fa fa-eye fa-fw"></i>View</a>
        <a href="#" id="EditDrug"><i class="fa fa-edit fa-fw"></i>Edit</a>
        <a href="#" id="SaveDrug"><i class="fa fa-save fa-fw"></i>Save</a>
        <a href="#" id="DeleteDrug"><i class="fa fa-remove fa-fw"></i>Delete</a>
        <a href="#" id="PrintDrugList"><i class="fa fa-print fa-fw"></i>Print</a>
        <a href="#" id="FilterDrug"><i class="fa fa-filter fa-fw"></i>Filter</a>
        <a href="#" id="ExportDrugList"><i class="fa fa-cog fa-fw"></i>Export</a>

    </div>

    <div class="st-content">

        <div class="container-fluid">

            <div class="page-header">
                <h3>Drug Master</h3>
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

                        <div class="panel panel-default">
                            <div class="panel-header">
                                <div class="row panel-body">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <h4 class="panel-title">List</h4>
                                    </div>
                                </div>
                            </div>
                            <div class="panel-body">
                                <div class="table-responsive">
                                    <table id="DrugList" class="table table-condesed">
                                        <thead>
                                            <tr>
                                                <th class="text-center">Action</th>
                                                <th class="text-center">Generic Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
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
                                <h3 class="panel-title">Drug Master</h3>
                            </div>

                            <div class="panel-body">

                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                    <div class="form-horizontal">

                                        <div class="form-group form-group-sm">

                                            <label class="col-sm-2">Drug Code</label>
                                            <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                                <input type="text" id="DrugCode" class="form-control" />
                                            </div>

                                        </div>

                                        <div class="form-group form-group-sm">

                                            <label class="col-sm-2">Generic Name</label>
                                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                <input type="text" id="GenericName" class="form-control" />
                                            </div>

                                        </div>

                                        <div class="form-group form-group-sm">

                                            <label class="col-sm-2">Drug Group</label>
                                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                <select id="DrugGroup" class="form-control"></select>
                                            </div>

                                        </div>

                                        <div class="form-group form-group-sm">

                                            <label class="col-sm-2">Brand Name</label>
                                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                <select id="Brand" class="form-control"></select>
                                            </div>

                                        </div>

                                        <div class="form-group form-group-sm">
                                            <label class="col-sm-2">Formulation</label>
                                            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                                <input type="text" id="Formulation" class="form-control" />
                                            </div>
                                        </div>

                                        <div class="form-group form-group-sm">
                                            <label class="col-sm-2">Strength</label>
                                            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                                                <input type="text" id="Strength" class="form-control" />
                                            </div>
                                        </div>

                                        <div class="form-group form-group-sm">
                                            <label class="col-sm-2">Unit</label>
                                            <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                                <input type="text" id="Unit" class="form-control" />
                                            </div>
                                        </div>

                                        <div class="form-group form-group-sm">
                                            <label class="col-sm-2">Adverse Effects</label>
                                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                <textarea id="AdverseEffects" class="form-control" rows="4"></textarea>
                                            </div>
                                        </div>

                                        <div class="form-group form-group-sm">
                                            <label class="col-sm-2">Precautions</label>
                                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                <textarea id="Precautions" class="form-control" rows="4"></textarea>
                                            </div>
                                        </div>

                                        <div class="form-group form-group-sm">
                                            <label class="col-sm-2">Routes</label>
                                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                <div id="Routes" style="max-height: 300px; overflow: auto;">
                                                    <%--<ul class="list-group list-group-flush">
                                                        <li class="list-group-item">
                                                            <label class='label-tick'>
                                                                <input type='checkbox' class='label-checkbox'/>
                                                                <span class='label-text'></span>
                                                            </label>
                                                        Apply
                                                        </li>
                                                        <li class="list-group-item">
                                                        <label class='label-tick'>
                                                                <input type='checkbox' class='label-checkbox'/>
                                                                <span class='label-text'></span>
                                                            </label>
                                                        Gargle
                                                        </li>
                                                        <li class="list-group-item">
                                                            <label class='label-tick'>
                                                                <input type='checkbox' class='label-checkbox'/>
                                                                <span class='label-text'></span>
                                                            </label>
                                                            (IM)
                                                        </li>
                                                        <li class="list-group-item">
                                                            <label class='label-tick'>
                                                                <input type='checkbox' class='label-checkbox'/>
                                                                <span class='label-text'></span>
                                                            </label>
                                                            Inhale
                                                        </li>
                                                        <li class="list-group-item">
                                                            <label class='label-tick'>
                                                                <input type='checkbox' class='label-checkbox'/>
                                                                <span class='label-text'></span>
                                                            </label>
                                                            Instill
                                                        </li>
                                                        <li class="list-group-item">
                                                            <label class='label-tick'>
                                                                <input type='checkbox' class='label-checkbox'/>
                                                                <span class='label-text'></span>
                                                            </label>
                                                            (IV)
                                                        </li>
                                                        <li class="list-group-item">
                                                        <label class='label-tick'>
                                                                <input type='checkbox' class='label-checkbox'/>
                                                                <span class='label-text'></span>
                                                            </label>
                                                            Oral
                                                        </li>
                                                        <li class="list-group-item">
                                                            <label class='label-tick'>
                                                                <input type='checkbox' class='label-checkbox'/>
                                                                <span class='label-text'></span>
                                                            </label>
                                                            (Sub cut)
                                                        </li>
                                                        <li class="list-group-item">
                                                            <label class='label-tick'>
                                                                <input type='checkbox' class='label-checkbox'/>
                                                                <span class='label-text'></span>
                                                            </label>
                                                            (TD)
                                                        </li>
                                                    </ul>--%>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group form-group-sm">
                                            <label class="col-sm-2">Remarks</label>
                                            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                                <textarea id="Remarks" class="form-control" rows="4"></textarea>
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
    <script type="text/javascript" src="../content/scripts/app/Masters/drug.js"></script>

</asp:Content>
