<%@ Page Title="MedicalTest" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="MedicalTest.aspx.cs" Inherits="HealthScreeningApp.Masters.MedicalTest" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cpMaster" runat="server">

    <div class="action-toolbar">

        <a href="#" id="AddNewMedicalTest"><i class="fa fa-plus fa-fw"></i>New</a>
        <a href="#" id="ShowMedicalTestList"><i class="fa fa-list fa-fw"></i>List</a>
        <a href="#" id="ViewMedicalTest"><i class="fa fa-eye fa-fw"></i>View</a>
        <a href="#" id="EditMedicalTest"><i class="fa fa-edit fa-fw"></i>Edit</a>
        <a href="#" id="SaveMedicalTest"><i class="fa fa-save fa-fw"></i>Save</a>
        <a href="#" id="DeleteMedicalTest"><i class="fa fa-remove fa-fw"></i>Delete</a>
        <a href="#" id="PrintMedicalTestList"><i class="fa fa-print fa-fw"></i>Print</a>
        <a href="#" id="FilterMedicalTestList"><i class="fa fa-filter fa-fw"></i>Filter</a>
        <a href="#" id="ExportMedicalTestList"><i class="fa fa-cog fa-fw"></i>Export</a>

    </div>

    <div class="st-content">

        <div class="container-fluid">

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


            <div class="page-header">
                <h3>MedicalTest</h3>
            </div>

            <div id="ViewMode">

                <div class="row">

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                        <div class="panel panel-default">
                            <div class="panel-header">
                                <div class="row panel-body">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <h4 class="panel-title">Medical Test</h4>
                                    </div>
                                </div>
                            </div>
                            <div class="panel-body">
                                <div class="table-responsive">
                                    <table id="MedicalTestList" class="table table-condesed">
                                        <thead>
                                            <tr>
                                                <th class="text-center">Action</th>
                                                <th class="text-center">Test Name</th>
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
                                <h3 class="panel-title"></h3>
                            </div>

                            <div class="panel-body">

                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                        <div class="form-group form-group-md">
                                            <label>Test Name</label>
                                            <input type="text" id="TestName" class="form-control input-md" />
                                        </div>
                                    </div>

                                    <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                        <label for="IsGeneralTest">Is General Test</label>
                                        <div class="form-group form-group-sm">
                                            <label class="lable-tick">
                                                <input type="radio" id="GeneralTestYes" class="label-radio" name="IsGeneralTest" value="Yes" />
                                                <span class="label-text">Yes</span>
                                            </label>
                                            <label class="lable-tick">
                                                <input type="radio" id="GeneralTestNo" class="label-radio" name="IsGeneralTest" checked="checked" value="No" />
                                                <span class="label-text">No</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                        <label for="IsTestHasParameters">Is Test Has Parameters</label>
                                        <div class="form-group form-group-sm">
                                            <label class="lable-tick">
                                                <input type="radio" id="TestParametersYes" class="label-radio" name="IsTestHasParameters" value="Yes" />
                                                <span class="label-text">Yes</span>
                                            </label>
                                            <label class="lable-tick">
                                                <input type="radio" id="TestParametersNo" class="label-radio" name="IsTestHasParameters" checked="checked" value="No" />
                                                <span class="label-text">No</span>
                                            </label>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div class="row">

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                        <div class="panel panel-info" id="TestParameterDetails">
                            <div class="panel-heading">
                                <h3 class="panel-title">Test Parameters</h3>
                            </div>

                            <div class="panel-body">

                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                        <div class="form-group form-group-md">
                                            <label>Parameter Name</label>
                                            <input type="text" id="ParameterName" class="form-control" />
                                        </div>
                                    </div>

                                    <%--<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                        <div class="form-group form-group-md">
                                            <label>Parameter Desc</label>
                                            <input type="text" id="ParameterDesc" class="form-control input-md" />
                                        </div>
                                    </div>--%>

                                    <div class="col-lg-1 col-md-1 col-sm-2 col-xs-12">
                                        <div class="form-group form-group-md">
                                            <label>Sequence</label>
                                            <input type="text" id="ParameterSequence" class="form-control input-md" />
                                        </div>
                                    </div>

                                    <div class="col-lg-1 col-md-1 col-sm-2 col-xs-12">
                                        <div class="form-group form-group-md">
                                            <label>Min. Value</label>
                                            <input type="text" id="MinValue" class="form-control input-md" />
                                        </div>
                                    </div>

                                    <div class="col-lg-1 col-md-1 col-sm-2 col-xs-12">
                                        <div class="form-group form-group-md">
                                            <label>Max. Value</label>
                                            <input type="text" id="MaxValue" class="form-control input-md" />
                                        </div>
                                    </div>

                                    <div class="col-lg-1 col-md-1 col-sm-2 col-xs-12">
                                        <div class="form-group form-group-md">
                                            <label>Normal Value</label>
                                            <input type="text" id="NormalValue" class="form-control input-md" />
                                        </div>
                                    </div>

                                    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                                        <div class="form-group form-group-md">
                                            <label>Unit</label>
                                            <select id="Unit" class="form-control"></select>
                                        </div>
                                    </div>

                                    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                                        <label></label>
                                        <button type="button" id="AddParameterDetails" class="btn btn-info btn-sm" style="margin-top: 24px;">Add</button>
                                    </div>

                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div class="table-responsive">
                                            <table id="TestParametersList" class="table table-condesed">
                                                <thead>
                                                    <tr>
                                                        <th class="text-center">Parameter Name</th>
                                                        <th class="text-center">Sequence</th>
                                                        <th class="text-center">Min. Value</th>
                                                        <th class="text-center">Max. Value</th>
                                                        <th class="text-center">Normal Value</th>
                                                        <th class="text-center">Unit</th>
                                                        <th class="text-center">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
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
    <script type="text/javascript" src="../content/scripts/app/Masters/medical-test.js"></script>

</asp:Content>
