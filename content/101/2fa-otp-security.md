/*
Title: 2FA / OTP Account Security
Sort: 10
*/

Two-factor authentication, or 2FA, by it's definition allows you to secure your
account via a second "factor" rather than just a password. Because passwords
can be read or stolen, and are a single piece of information that any malicious
person needs to access your account, a second factor called One Time
Passwords or OTP are used and linked to a physical device that is on your
person -- so you know that the person logging in is truly you. This added
security will thwart would-be attackers even if they know your account
password.


## Configuring 2FA / OTP on your account

Turning on 2FA can be done by visiting your
[Account Settings](https://client.clouda.ca/accounts/settings)
page and clicking the `Enable 2FA/OTP` button.

![OTP Configured](/img/content/101/otp-configuration.jpg)

This will generate your private
key and show you your QR code and recovery codes, as well as provide you with a
quick OTP test mechanism to confirm your settings. Make sure you read all of
the instructions on the Account Settings page, and subsequent setup pages to
make sure everything goes smoothly. To ensure that security is maintained, some
information can only be provided to you on setup, so make sure not to lose it.

Turning off 2FA can be done be visiting your
[Account Settings](https://client.clouda.ca/accounts/settings)
page and clicking the `Disable 2FA/OTP` button after logging in successfully
with your OTP credentials.

## Recovery Codes

If you are ever stranded without your device and need emergency access to your
account, we generate and provide you with 4 codes that can be used as your OTP
code which do not expire until they are used. Each recovery code can only be
used **once**, and will be *expired immediately* after successful use. You can
track how many recovery codes you have remaining on your
[Account Settings](https://client.clouda.ca/accounts/settings)
page.

## Mobile Applications

Our 2FA / OTP implementation is compatible with any Google Authenticator
compatible mobile application.

We highly recommend [FreeOTP](https://fedorahosted.org/freeotp/) for managing
your OTP credentials. It is free, secure, standards-compliant, and open
source. The app is available for download on
[Google Play for Android](https://play.google.com/store/apps/details?id=org.fedorahosted.freeotp),
as well as the
[App Store for iOS](https://itunes.apple.com/us/app/freeotp/id872559395)
devices.

## Traditional / API Login Support

For systems or applications that do not support our multi-factor authentication
yet, or interacting with our APIs in an automated way, we suggest creating
another team member on your account with only the `Ops` role, and a very strong
password which would act as an access token whose sole purpose is performing
those tasks.

This way, any issues that arise with the security of that account can be
mitigated by changing the password, and having it only effect the single
system requiring the authentication information.

## API Specification

If you are interested in adding support for our Keystone 2FA / OTP
implementation to your project, you can view our user
[API Documentation](http://docs.clouda.ca/api/api-ref-identity-v3.html#tokens-v3)
for specific details. Users with OTP enabled are restricted to using the
Keystone V3 APIs, as the deprecated V2 APIs do not support the extensibility
required to add this extra layer of security.
