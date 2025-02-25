  import { Client, Account, ID ,Databases} from "appwrite";

  export class AuthService {
      client = new Client();
      account;
      databases;
    //   db={};
    //   collections;
      constructor() {
        this.client.setEndpoint('https://cloud.appwrite.io/v1').setProject('6758217300011c74ed24');
          this.account = new Account(this.client);
          this.databases=new Databases(this.client)
      }

      async createAccount({email, password, fullname}) {
        
          try {
              const userAccount = await this.account.create(ID.unique(), email, password, fullname);
              if (userAccount) {
                  // call another method to directly login the user
                  return this.login({email, password});
              } else {
                  return userAccount;
              }
          } catch (error) {
              throw error;
          }
       
      }

      async getAccount(){
        try{
            const userAccount=await this.account.get()
            return userAccount
        }catch (error){
            throw error
        }
      }

      async login({email, password}) {
          try {
              const session= await this.account.createEmailPasswordSession(email, password);
              return session;
          } catch (error) {
              throw error;
          }
      }

      async logout() {
          try {
              return await this.account.deleteSession('current');
          } catch (error) {
              throw error;
          }
      }

      async forgotPassword({email}) {
          try {
              return await this.account.createRecovery(email, conf.passwordResetUrl);
          } catch (error) {
              throw error;
          }
      }

      async resetPassword({userId, secret, password, confirmPassword}) {
          try {
              if (password !== confirmPassword) {
                  throw new Error("Passwords do not match");
              }
              return await this.account.updateRecovery(userId, secret, password, confirmPassword);
          } catch (error) {
              throw error;
          }
      }
  }

  const authService = new AuthService();

  export default authService;