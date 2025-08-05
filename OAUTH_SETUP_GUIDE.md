# 🔐 Google OAuth Setup Guide för Bilio

## Problem som löses
- Google login fungerar inte
- Användare kan inte autentisera med Google
- Session sparas inte korrekt

## Steg 1: Konfigurera Google OAuth i Supabase Dashboard

### 1.1 Öppna Supabase Dashboard
1. Gå till [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Välj ditt projekt: `jdkmwxbrztskaiwpcjfi`

### 1.2 Konfigurera Google Provider
1. Gå till **Authentication** → **Providers**
2. Klicka på **Google**
3. Aktivera Google provider
4. Fyll i följande:
   - **Client ID**: `1034787364228-u6jjkg9nf8p68jd5g43ue91sajl79j6f.apps.googleusercontent.com`
   - **Client Secret**: `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`

### 1.3 Callback URL
Supabase kommer automatiskt att använda:
```
https://jdkmwxbrztskaiwpcjfi.supabase.co/auth/v1/callback
```

## Steg 2: Verifiera Google Cloud Console

### 2.1 Authorized redirect URIs (redan konfigurerat ✅)
```
https://jdkmwxbrztskaiwpcjfi.supabase.co/auth/v1/callback
http://localhost:3000/auth/callback
```

### 2.2 Authorized JavaScript origins (redan konfigurerat ✅)
```
https://jdkmwxbrztskaiwpcjfi.supabase.co
http://localhost:3000
```

## Steg 3: Testa OAuth Flow

### 3.1 Starta utvecklingsserver
```bash
npm run dev
```

### 3.2 Testa authentication
1. Gå till `http://localhost:3000/login`
2. Klicka på "Logga in med Google"
3. Slutför Google OAuth flow
4. Verifiera att du redirectas tillbaka till startsidan som inloggad

### 3.3 Debug information
Om det fortfarande inte fungerar, gå till:
`http://localhost:3000/debug-oauth`

## Steg 4: Produktionsdeploy

När allt fungerar lokalt, lägg till produktions-URL:er i Google Cloud Console:
```
https://din-domain.com/auth/callback
https://din-domain.com
```

## Vanliga problem och lösningar

### Problem: "OAuth Error: access_denied"
**Lösning**: Google OAuth-credentials är inte korrekt konfigurerade i Supabase Dashboard

### Problem: "Invalid redirect URI"
**Lösning**: Kontrollera att callback URL:er matchar exakt i Google Cloud Console

### Problem: Session sparas inte
**Lösning**: Kontrollera att cookies fungerar och att callback-routen returnerar korrekt

## Teknisk information

### Auth Flow
1. Användare klickar "Logga in med Google" (`/login`)
2. Supabase redirectar till Google OAuth
3. Google redirectar tillbaka till Supabase (`/auth/v1/callback`)
4. Supabase redirectar till din app (`/auth/callback`)
5. Din callback-route hanterar session och redirectar till `/`

### Session Management
- `UserButton.tsx` hanterar auth state
- `supabase.auth.onAuthStateChange` lyssnar på ändringar
- Session persisteras automatiskt av Supabase