<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep TerraFarm's demonstration data in a shared frontend module and all analytical interactions client-side, because this hackathon build intentionally has no backend or live NASA feeds.
- Use separate TanStack routes for every step of the farm analysis journey, because each view needs direct navigation and distinct page metadata.
