module Users
  class OmniauthController <  Devise::OmniauthCallbacksController
    def github
      sign_in_and_redirect request_user
    end

    def google_oauth2
      sign_in_and_redirect request_user
    end

    private

    def omniauth_auth
      request.env['omniauth.auth']
    end

    def request_info
      omniauth_auth['info']
    end

    def request_email
      request_info['email']
    end

    def request_user
      @request_user ||= begin
        user = User.find_or_initialize_by(email: request_email)

        user.provider = omniauth_auth['provider']
        user.uid = omniauth_auth['uid']
        user.remember_me!
        user.save!

        user
      end
    end
  end
end
