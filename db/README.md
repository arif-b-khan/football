### Adding migration

```
# Run following command to add migration
>> npx sequelize model:generate --name Team --attributes name:string,img:string
# code to migrate
>> npx sequelize db:migrate up
```

### Adding Seeds

```
>>  npx sequelize seed:generate --name add-teams
# push seed
>> npx sequelize db:seed:all
```
