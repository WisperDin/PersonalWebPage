import utils from "./utils";


describe('Utils', () => {

  //将一个结构解析成参数
  it('parseParam .',() => {
    let param:any = {
      account: 13544489954,
      code: 1234,
      pwd: '465fzxvd'
    }
    let form:any = utils.parseParam(param)
    console.debug(form)
    expect(form).toBe('account=13544489954&code=1234&pwd=465fzxvd')
  });

  //将一个结构解析成参数 失败
  it('parseParam param null.',() => {
    let form:any = utils.parseParam(null)
    console.debug(form)
    expect(form).toBe('')
  });

  //将一个结构解析成参数 失败
  it('customAlert .',() => {
    let alert:any[]=[]
    utils.customAlert(alert,'danger',"Sign In Failed")
    expect('[{"type":"danger","msg":"Sign In Failed","timeout":500}]').toBe(JSON.stringify(alert))
  });


})
