const mockFieldsModel = [{'id':'accstandards','dataType':5,'datatype':5,'type':'ref','label':'准则','hidden':false,'defaultValue':{'id':'','code':'','name':''},'validators':[{'type':'required'}],'referConfig':{'referConditions':{'refCode':'accstandard','refType':'list','displayFields':['id','code','name'],'funcode':null,'pk_org':null},'labelKey':'name','referDataUrl':'http://172.20.4.220/ficloud/refbase_ctr/queryRefJSON'},'placeholder':'请选择','referExtend':{'showDisabledBtnText':'显示停用','showDisabledBtnText_Not':'隐藏停用'},'multiple':true},{'id':'authinfos','dataType':5,'datatype':5,'type':'ref','label':'使用组织','hidden':false,'defaultValue':{'id':'','code':'','name':''},'validators':[{'type':'required'}],'referConfig':{'referConditions':{'refCode':'org','refType':'list','displayFields':['id','code','name'],'funcode':null,'pk_org':null},'labelKey':'name','referDataUrl':'http://172.20.4.220/ficloud/refbase_ctr/queryRefJSON'},'placeholder':'请选择','referExtend':{'showDisabledBtnText':'显示停用','showDisabledBtnText_Not':'隐藏停用'},'multiple':true},{'id':'code','dataType':0,'datatype':0,'type':'string','label':'编码','hidden':false,'defaultValue':'','validators':[{'type':'required'},{'type':'length','options':{'min':0,'max':255}}]},{'id':'description','dataType':0,'datatype':0,'type':'string','label':'描述','hidden':false,'defaultValue':'','validators':[{'type':'length','options':{'min':0,'max':2000}}]},{'id':'name','dataType':0,'datatype':0,'type':'string','label':'名称','hidden':false,'defaultValue':'','validators':[{'type':'required'},{'type':'length','options':{'min':0,'max':2000}}]},{'id':'pid','dataType':5,'datatype':5,'type':'ref','label':'派生自','hidden':false,'defaultValue':{'id':'','code':'','name':''},'referConfig':{'referConditions':{'refCode':'rptitemtype','refType':'list','displayFields':['id','code','name'],'funcode':null,'pk_org':null},'labelKey':'name','referDataUrl':'http://172.20.4.220/ficloud/refbase_ctr/queryRefJSON'},'placeholder':'请选择','referExtend':{'showDisabledBtnText':'显示停用','showDisabledBtnText_Not':'隐藏停用'},'multiple':null},{'id':'pk_org','dataType':5,'datatype':5,'type':'ref','label':'所属组织','hidden':false,'defaultValue':{'id':'','code':'','name':''},'validators':[{'type':'required'}],'referConfig':{'referConditions':{'refCode':'org','refType':'list','displayFields':['id','code','name'],'funcode':null,'pk_org':null},'labelKey':'name','referDataUrl':'http://172.20.4.220/ficloud/refbase_ctr/queryRefJSON'},'placeholder':'请选择','referExtend':{'showDisabledBtnText':'显示停用','showDisabledBtnText_Not':'隐藏停用'},'multiple':null}];

const mockFormData = {'authinfos':[{'creator':'c283c411-925a-4429-9ba7-046b7b03b1ae','code':'003','sysid':'yonyoufi','modifier':'c283c411-925a-4429-9ba7-046b7b03b1ae','effectivedate':'2018-11-15 00:00:00','innercode':'HJBL7C5V','parentid':'69dabcaf400a4189b59a7bc60e547f14','dr':0,'principal':'4219cfd9ef314fd09d00bf1ba3a807c0','modifiedtime':'2018-11-15 10:22:14','enable':1,'name':'test003','tenantid':'v6luth84','id':'b8bfb5d268de433eb79a5cee04c1bae2','creationtime':'2018-11-15 10:22:14','ts':'2018-11-15 10:22:14'}],'code':'111','name':'111','tenantid':'v6luth84','description':'','id':'A5172B40-A30A-45A5-808A-3994E7C2B4FB','accstandards':[{'code':'03','name':'香港会计准则','id':'G001ZM0000DEFAULTACCSTANDARD00000003'},{'code':'01','name':'企业会计准则','id':'G001ZM0000DEFAULTACCSTANDARD00000001'}],'pk_org':{'creator':'c283c411-925a-4429-9ba7-046b7b03b1ae','code':'003','sysid':'yonyoufi','modifier':'c283c411-925a-4429-9ba7-046b7b03b1ae','effectivedate':'2018-11-15 00:00:00','innercode':'HJBL7C5V','parentid':'69dabcaf400a4189b59a7bc60e547f14','dr':0,'principal':'4219cfd9ef314fd09d00bf1ba3a807c0','modifiedtime':'2018-11-15 10:22:14','enable':1,'name':'test003','tenantid':'v6luth84','id':'b8bfb5d268de433eb79a5cee04c1bae2','creationtime':'2018-11-15 10:22:14','ts':'2018-11-15 10:22:14'},'ts':1552023502000};

const FormBasicExample = React.createClass({
  getInitialState() {
    return {
      formData: {}
    };
  },

  handleBlur(/* index, fieldModel, value */) {
  },

  handleChange(fieldId, value) {
    const newState = { ...this.state };
    newState.formData[fieldId] = value;
    this.setState(newState);
  },

  handleSubmit(formData) {
    alert('提交的数据: Form.state.formData: \n' + JSON.stringify(
      formData,
      null, '  '));
  },

  handleReset(/* event */) {
  },

  render() {
    return (
      <Form
        fieldsModel={mockFieldsModel}
        defaultData={mockFormData}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        onBlur={this.handleBlur}
        onReset={this.handleReset}
      />
    );
  }

});

ReactDOM.render(<FormBasicExample />, mountNode);
