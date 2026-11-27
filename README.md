# Men's Ensemble

Seating chart and attendance web app for iPad, synced through Firebase.

- App: https://mens-ensemble-hst13.web.app (open in Safari, then Share → Add to Home Screen)
- Sign in with Google. Only the owner and the people the owner adds in **Settings** can read or change data.

## Deploying

```
firebase deploy
```

`firestore.rules` is generated from `firestore.rules.template` with the owner's email filled in, and is kept out of git.
