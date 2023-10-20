# 数据库设计

## 1.file表(文件表)

- 主键id： file_id

- 上传时间：file_createtime
- 文件类型： file_type  

> 0-图片（.jpg .png .svg .gif .jpeg .webp .ico）考虑大小写
>
> 1-视频（.mp4 .ogg .webm） 后续考虑支持 .mov .flv 视频格式 https://blog.51cto.com/u_16213305/7187196
>
> 2-音乐（.mp3 .wav .aac ）
>
> 3-压缩包（.rar .7z .zip）
>
> 4-安装包（.exe .apk  .ipa）
>
> 5-代码文本（.js .css .html .sql .java .php .py）
>
> 6-记事本（.txt )
>
> 7-office文件（.doc .docx .xls .xlsx .ppt .pptx）
>
> 8-其他文件（兜底项目 ...）

- 文件后缀名：file_suffix
- 文件名：file_name

- 文件地址链接：file_link
- 所属者上传id：file_user_id
- 文件点赞数量：file_likes
- 文件备注：file_remark
- 文件浏览量：file_views
- 文件是否公开：file_public

> 0-私有  1-公开

- 图片上传地址位置：file_address



## 2.user表(用户表)

- 用户id：user_id

- 用户名：user_name

- 密码: user_password
- 邮箱: user_email
- 性别: user_sex
-  个人签名: user_sign
- 头像: user_avatar
- 创建时间: user_createtime



## 3.like表 (点赞表)

- 点赞id: like_id
- 点赞用户id: like_user_id
- 点赞文件id: like_file_id
- 点赞时间: like_createtime



## 4.feedback表 (反馈表)

- 反馈id：fb_id
- 反馈文件 id：  fb_file_id
- 反馈状态：  fb_state

> 0-反馈失败  1-审核中  2-反馈成功

- 反馈者用户id：fb_user_id  
- 反馈备注信息：fb_comment
- 反馈时间：fb_createtime



## 5.collect表 (收藏表)

- 收藏用户自己id: collect_id

- 收藏文件所属者id: collect_user_id

- 收藏文件id: collect_file_id 

- 收藏文件类型:   collect_file_type

> 对应文件类型 

- 收藏时间:   collect_createtime


