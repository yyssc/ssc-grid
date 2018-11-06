## [v0.69.19]
> 2018-11-06

- **Feature:** 支持从组件外传入确定按钮文字
- **Feature:** 支持从组件外传入取消按钮文字

[v0.69.19]: https://github.com/yyssc/ssc-grid/compare/v0.69.18...v0.69.19

## [v0.69.17]
> 2018-09-14

- **Bugfix:** 修复Firefox浏览器中form中自定义类型值改变报错

[v0.69.17]: https://github.com/yyssc/ssc-grid/compare/v0.69.16...v0.69.17

## [master]
> 2017-09-06

[master]: https://github.com/yyssc/ssc-grid/compare/v0.69.16...master

## [v0.69.16]
> 2017-09-06

- **Bugfix:** 解决`ValidateFloatInput`组件不能通过`value`属性更新数值的问题

[v0.69.16]: https://github.com/yyssc/ssc-grid/compare/v0.69.15...v0.69.16

## [v0.69.15]
> 2017-09-06

- **Chore:** TextField support number type value
- **Feature:** ValidateFloatInput support validation message
- **Feature:** 支持从组件外通过ref调用`doValid()`方法
- **Bugfix:** 解决不能传值的bug

[v0.69.15]: https://github.com/yyssc/ssc-grid/compare/v0.69.14...v0.69.15

## [v0.69.14]
> 2017-09-06

- **Feature:** ValidateFloatInput

[v0.69.14]: https://github.com/yyssc/ssc-grid/compare/v0.69.13...v0.69.14

## [v0.69.13]
> 2017-08-17

- **Chore:** Add className to required form field

[v0.69.13]: https://github.com/yyssc/ssc-grid/compare/v0.69.12...v0.69.13

## [v0.69.12]
> 2017-08-03

- **Chore:** Import individual component from react-bootstrap to reduce bundle size ([#93])

[v0.69.12]: https://github.com/yyssc/ssc-grid/compare/v0.69.11...v0.69.12
[#93]: https://github.com/yyssc/ssc-grid/issues/93

## [v0.69.11]
> 2017-07-18

- **Chore:** 去掉ssc-refer2的peer deps ([#92])

[v0.69.11]: https://github.com/yyssc/ssc-grid/compare/v0.69.10...v0.69.11
[#92]: https://github.com/yyssc/ssc-grid/issues/92

## [v0.69.10]
> 2017-07-17

- **Bugfix:** Fix event is undefined in Firefox ([#90])

[v0.69.10]: https://github.com/yyssc/ssc-grid/compare/v0.69.9...v0.69.10
[#90]: https://github.com/yyssc/ssc-grid/issues/90

## [v0.69.9]
> 2017-07-07

- **Bugfix:** Fix undefined error ([#83])
- **Bugfix:** Fix select() not select table header checkbox ([#84])
- **Bugfix:** Page reload when clicking on submit button ([#85])
- **Feature:** Row class name ([#87])

[v0.69.9]: https://github.com/yyssc/ssc-grid/compare/v0.69.8...v0.69.9
[#83]: https://github.com/yyssc/ssc-grid/issues/83
[#84]: https://github.com/yyssc/ssc-grid/issues/84
[#85]: https://github.com/yyssc/ssc-grid/issues/85
[#87]: https://github.com/yyssc/ssc-grid/issues/87

## [v0.69.8]
> 2017-06-27

- **Chore:** Add `displayName` to components ([#73])
- **Bugfix:** Fix alignment bug causing by custom formatter ([#78])
- **Feature:** Initialize Grid with selected rows ([#80])
- **Feature:** 应用层需求 添加select方法 ([#82])

[v0.69.8]: https://github.com/yyssc/ssc-grid/compare/v0.69.7...v0.69.8
[#73]: https://github.com/yyssc/ssc-grid/issues/73
[#78]: https://github.com/yyssc/ssc-grid/issues/78
[#80]: https://github.com/yyssc/ssc-grid/issues/80
[#82]: https://github.com/yyssc/ssc-grid/issues/82

## [v0.69.7]
> 2017-06-24

- **Bugfix:** Fix failed to submit form on hidden required field ([#74])

[v0.69.7]: https://github.com/yyssc/ssc-grid/compare/v0.69.6...v0.69.7
[#74]: https://github.com/yyssc/ssc-grid/issues/74

## [v0.69.6]
> 2017-06-24

- **Feature:** Support submit() function on Form component ([#79])

[v0.69.6]: https://github.com/yyssc/ssc-grid/compare/v0.69.5...v0.69.6
[#79]: https://github.com/yyssc/ssc-grid/issues/79

## [v0.69.5]
> 2017-06-22

- **Bugfix:** Fix click event mistake ([#77])

[v0.69.5]: https://github.com/yyssc/ssc-grid/compare/v0.69.4...v0.69.5
[#77]: https://github.com/yyssc/ssc-grid/issues/77

## [v0.69.4]
> 2017-06-03

- **Feature:** Support click and double click event on table cell and row. ([#69])
- **Feature:** Add react-intl package to internationalize React apps. ([#70])
- **Bugfix:** React.createClass is deprecated. ([#71])
- **Bugfix:** Not convert custom type form field value ([#76])

[v0.69.4]: https://github.com/yyssc/ssc-grid/compare/v0.69.3...v0.69.4
[#69]: https://github.com/yyssc/ssc-grid/issues/69
[#70]: https://github.com/yyssc/ssc-grid/issues/70
[#71]: https://github.com/yyssc/ssc-grid/issues/71
[#76]: https://github.com/yyssc/ssc-grid/issues/76

## [v0.69.3]
> 2017-06-02

- **Chore:** 将ssc-refer2改为peer deps ([#66])
- **Bugfix:** 解决PropTypes报警的问题 ([#67])

[v0.69.3]: https://github.com/yyssc/ssc-grid/compare/v0.69.2...v0.69.3
[#66]: https://github.com/yyssc/ssc-grid/issues/66
[#67]: https://github.com/yyssc/ssc-grid/issues/67

## [v0.69.2]
> 2017-06-01

- **Bugfix:** 使用[ssc-refer2](https://github.com/yyssc/ssc-refer2)替换掉没有人维护的[ssc-refer](https://github.com/tigerandgirl/ssc-refer) ([#65])

[v0.69.2]: https://github.com/yyssc/ssc-grid/compare/v0.69.1...v0.69.2
[#65]: https://github.com/yyssc/ssc-grid/issues/65

## [v0.69.1]
> 2017-06-01

- **Bugfix:** 解决React错误 ([#62])

[v0.69.1]: https://github.com/yyssc/ssc-grid/compare/v0.69.0...v0.69.1
[#62]: https://github.com/yyssc/ssc-grid/issues/62

## [v0.69.0]
> 2017-05-31

- **Breaking:** 更改Form组件的`layout`参数，使用bootstrap的Grid布局中的`md`等参数来指定不同屏幕下的表单布局 ([#61])

[v0.69.0]: https://github.com/yyssc/ssc-grid/compare/v0.68.7...v0.69.0
[#61]: https://github.com/yyssc/ssc-grid/issues/61

## [v0.68.7]
> 2017-05-24

- **Bugfix:** 升级react-datepicker解决`React.createClass`报警的问题

[v0.68.6]: https://github.com/yyssc/ssc-grid/compare/v0.68.6...v0.68.7

## [v0.68.6]
> 2017-05-24

- **Bugfix:** 解决createClass废弃的警告 ([#58])

[v0.68.6]: https://github.com/yyssc/ssc-grid/compare/v0.68.5...v0.68.6
[#58]: https://github.com/yyssc/ssc-grid/issues/58

## [v0.68.5]
> 2017-05-23

- **Bugfix:** 解决PropTypes的警告 ([#57])

[v0.68.5]: https://github.com/yyssc/ssc-grid/compare/v0.68.4...v0.68.5
[#57]: https://github.com/yyssc/ssc-grid/issues/57

## [v0.68.4]
> 2017-05-23

- **Bugfix:** 解决ValidateRefers没有传validators参数时候的报错 ([#56])

[v0.68.4]: https://github.com/yyssc/ssc-grid/compare/v0.68.3...v0.68.4
[#56]: https://github.com/yyssc/ssc-grid/issues/56

## [v0.68.3]
> 2017-05-23

- **Bugfix:** 解决没有传validators参数时候的报错 ([#55])

[v0.68.3]: https://github.com/yyssc/ssc-grid/compare/v0.68.2...v0.68.3
[#55]: https://github.com/yyssc/ssc-grid/issues/55

## [v0.68.2]
> 2017-05-23

- **Bugfix:** 解决重置文本框时候的状态错误 ([#53])

[v0.68.2]: https://github.com/yyssc/ssc-grid/compare/v0.68.1...v0.68.2
[#53]: https://github.com/yyssc/ssc-grid/issues/53

## [v0.68.1]
> 2017-05-17

- **Feature:** 自定义组件传入customFieldModel属性

[v0.68.1]: https://github.com/yyssc/ssc-grid/compare/v0.68.0...v0.68.1

## [v0.68.0]
> 2017-05-17

- **Breaking:** 升级React从0.14.9到15.4.0解决部分报警问题 ([#51])

[v0.68.0]: https://github.com/yyssc/ssc-grid/compare/v0.67.0...v0.68.0
[#51]: https://github.com/yyssc/ssc-grid/issues/51

## [v0.67.0]
> 2017-05-17

- **Breaking:** 升级react到0.14.9解决prop-types报警告的问题 ([#28], [#48])

[v0.67.0]: https://github.com/yyssc/ssc-grid/compare/v0.66.5...v0.67.0
[#28]: https://github.com/yyssc/ssc-grid/issues/28
[#49]: https://github.com/yyssc/ssc-grid/issues/49

## [v0.66.5]
> 2017-05-16

- **Bugfix:** 解决文档跳转问题 ([#48])

[v0.66.5]: https://github.com/yyssc/ssc-grid/compare/v0.66.4...v0.66.5
[#48]: https://github.com/yyssc/ssc-grid/issues/48

## [v0.66.4]
> 2017-05-16

- **Feature:** 支持ValidateRefers参照校验 ([#47])

[v0.66.4]: https://github.com/yyssc/ssc-grid/compare/v0.66.3...v0.66.4
[#47]: https://github.com/yyssc/ssc-grid/issues/47

## [v0.66.3]
> 2017-05-16

- **Feature:** ValidateInput支持doValidate方法进行主动校验 ([#46])
- **Feature:** ValidateInput支持reset方法，可以重置文本框的校验状态和文本框的文本 ([#46])

[v0.66.3]: https://github.com/yyssc/ssc-grid/compare/v0.66.2...v0.66.3
[#46]: https://github.com/yyssc/ssc-grid/issues/46

## [v0.66.2]
> 2017-05-15

- **Feature:** 支持ValidateInput组件 ([#45])

[v0.66.2]: https://github.com/yyssc/ssc-grid/compare/v0.66.1...v0.66.2
[#45]: https://github.com/yyssc/ssc-grid/issues/45

## [v0.66.1]
> 2017-05-13

- **Bugfix:** [Form] 清空参照文本框内容的时候onChange没有被调用 ([#44])

[v0.66.1]: https://github.com/yyssc/ssc-grid/compare/v0.66.0...v0.66.1
[#44]: https://github.com/yyssc/ssc-grid/issues/44

## [v0.66.0]
> 2017-05-11

- **Breaking:** [Form] 修复文本框失去焦点的问题。`layout`属性改成让用户传入布局好的id数组 ([#42])

[v0.66.0]: https://github.com/yyssc/ssc-grid/compare/v0.65.2...v0.66.0
[#42]: https://github.com/yyssc/ssc-grid/issues/42

## [v0.65.2]
> 2017-05-10

- **Bugfix:** [Form] 修复参照的onChange没有触发的问题 ([#41])

[v0.65.2]: https://github.com/yyssc/ssc-grid/compare/v0.65.1...v0.65.2
[#41]: https://github.com/yyssc/ssc-grid/issues/41

## [v0.65.1]
> 2017-05-10

- **Feature:** [Form] 支持禁用文本框 ([#40])

[v0.65.1]: https://github.com/yyssc/ssc-grid/compare/v0.65.0...v0.65.1
[#40]: https://github.com/yyssc/ssc-grid/issues/40

## [v0.65.0]
> 2017-05-10

- **Breaking:** [Form] 去掉`type = 'hidden'`这个类型，解决含义混淆问题 ([#39])

[v0.65.0]: https://github.com/yyssc/ssc-grid/compare/v0.64.14...v0.65.0
[#39]: https://github.com/yyssc/ssc-grid/issues/39

## [v0.64.14]
> 2017-05-10

- **Feature:** [Form] 在label和form control之间添加空格

[v0.64.14]: https://github.com/yyssc/ssc-grid/compare/v0.64.13...v0.64.14

## [v0.64.13]
> 2017-05-08

- **Bugfix:** [Form] 修复带有布局的表单没有添加fluid属性的问题 ([#38])

[v0.64.13]: https://github.com/yyssc/ssc-grid/compare/v0.64.12...v0.64.13
[#38]: https://github.com/yyssc/ssc-grid/issues/38

## [v0.64.12]
> 2017-05-08

- **Bugfix:** [Form] 修复使用layout属性的时候没有更新组件内部字段状态的问题 ([#37])

[v0.64.12]: https://github.com/yyssc/ssc-grid/compare/v0.64.11...v0.64.12
[#37]: https://github.com/yyssc/ssc-grid/issues/37

## [v0.64.11]
> 2017-05-05

- **Bugfix:** [Form] 当传入layout和showSubmitButton属性的时候，提交按钮没有被隐藏 ([#36])

[v0.64.11]: https://github.com/yyssc/ssc-grid/compare/v0.64.10...v0.64.11
[#36]: https://github.com/yyssc/ssc-grid/issues/36

## [v0.64.10]
> 2017-05-05

- **Feature:** 表单支持通过属性隐藏提交按钮 ([#35])

[v0.64.10]: https://github.com/yyssc/ssc-grid/compare/v0.64.9...v0.64.10
[#35]: https://github.com/yyssc/ssc-grid/issues/35

## [v0.64.9]
> 2017-04-26

- **Feature:** 操作按钮飘在某一列的上面 ([#34])

[v0.64.9]: https://github.com/yyssc/ssc-grid/compare/v0.64.8...v0.64.9
[#34]: https://github.com/yyssc/ssc-grid/issues/34

## [v0.64.8]
> 2017-04-26

- **Bugfix:** 测试一下给Refer传值从defaultSelected改成selected ([#33])

[v0.64.8]: https://github.com/yyssc/ssc-grid/compare/v0.64.7...v0.64.8
[#33]: https://github.com/yyssc/ssc-grid/issues/33

## [v0.64.7]
> 2017-04-25

- **Bugfix:** 当传入`Form`组件的`defaultData`属性发生了变化的时候，同步更新`Form`中的状态 ([#31])

[v0.64.7]: https://github.com/yyssc/ssc-grid/compare/v0.64.6...v0.64.7
[#31]: https://github.com/yyssc/ssc-grid/issues/31

## [v0.64.6]
> 2017-04-24

- **Feature:** 通过参数控制参照字段的禁用状态 ([#29])
- **Bugfix:** 需要修改参照的后端地址 ([#30])

[v0.64.6]: https://github.com/yyssc/ssc-grid/compare/v0.64.5...v0.64.6
[#29]: https://github.com/yyssc/ssc-grid/issues/29
[#30]: https://github.com/yyssc/ssc-grid/issues/30
