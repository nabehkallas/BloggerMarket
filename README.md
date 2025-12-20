<b>
BloggerMarket
</b>  
is a high-performance mobile marketplace built with React Native (Expo). It serves as a proof-of-concept for a creator-economy platform, allowing users to discover bloggers, view transparent video pricing, and access exclusive promotional offers. The project demonstrates advanced frontend patterns including Server-State Management, Optimized Search, and Custom Navigation.\
<br>
<br>
<br>
<hr>
<div align="center">
<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/183852987/528882317-029b0549-a0c7-43f2-9821-6e96cf81cdd9.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20251220%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251220T150323Z&X-Amz-Expires=300&X-Amz-Signature=59e79308e64f58be34cc3830f2dff31f0c8ad66072a3d563d135c0743b8d3918&X-Amz-SignedHeaders=host" width="250" /> | <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/183852987/528882316-6ebe49f6-936b-4571-92be-5d1c45cb0595.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20251220%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251220T150352Z&X-Amz-Expires=300&X-Amz-Signature=5396f2c639a615ab87c168c5d0687170de20f2bef840cb5abf035ce3a19d7567&X-Amz-SignedHeaders=host" width="250" /> | <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/183852987/528882315-464f2c56-518e-46a1-affb-285d87fadb16.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20251220%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251220T150417Z&X-Amz-Expires=300&X-Amz-Signature=6cd44bc0e25b82ed340150e7f0d4339237cf80e53c8d0f4775f9ed58fe617b9b&X-Amz-SignedHeaders=host" width="250" /> |
</div>
<hr>
<br>
<br>
<br>
<ul>
<b>Features:</b>

<li><b>Authentication Engine:</b> A robust mock service simulating real-world OAuth flows, featuring secure-feel input validation and persistent session state.</li>
<li><b>TanStack-Powered Discovery:</b> Real-time search and filtering of the blogger marketplace, leveraging TanStack Query for efficient data synchronization and "instant-feel" UI updates.</li>
<li><b>Blogger Insight Modals:</b>High-detail, context-aware overlays that present pricing structures and engagement stats without disrupting the user's scroll position.</li>
<li><b>Special Offers Marketplace:</b>A dedicated module for browsing time-sensitive promotions, utilizing complex list layouts and RNEUI components.</li>
<li><b>Drawer-Based Navigation:</b>A professional sidebar architecture that provides quick access to User Profiles, Market Discovery, and Settings.</li>

</ul>
<br>
<br>
<br>
<ul>
<b>Tech Stack:</b>
<li><b>Navigation:</b> Expo Router / Drawer Navigation (for seamless side-menu transitions).</li>
<li><b>State & Data:</b> TanStack Query (v5) — Handled caching, synchronization, and asynchronous mock data fetching.</li>
<li><b>UI Framework: React Native Elements (RNEUI)</b> combined with custom CSS-in-JS for a consistent, themeable design.</li>
<li><b>Performance:</b> Implemented debounced filtering and optimized list rendering.</li>
</ul>
<br>
<br>
<br>
<b>Why using TanStack Query?</b>
<br>
I chose TanStack Query because it handles the complexities of caching and 'stale-while-revalidate' logic automatically, which is essential for a marketplace app where prices and offers might update frequently. For the UI, RNEUI allowed me to build a professional-grade interface quickly while maintaining full control over the styling via CSS

 