# FREE GPU PATH — ComfyUI on Google Colab (no money, no local GPU)

Your laptop has no dedicated GPU, ComfyUI won't run locally, and all cloud credits are spent.
**Google Colab gives a free NVIDIA T4 GPU** in the browser — enough to run full-quality SDXL
(Juggernaut XL / RealVisXL, not just Turbo). We run ComfyUI there, expose it with a free tunnel,
and the pipeline on your laptop drives it. 100% free.

> **Limits (still free):** a Colab session idles out after a while and caps ~12h; free GPU has a
> daily quota. Fine for generating batches; just re-run the notebook when it disconnects.

---

## Steps (≈5 min, all in the browser)

1. Go to **colab.research.google.com** → **New notebook** (sign in with your Google account).
2. **Runtime → Change runtime type → Hardware accelerator: T4 GPU → Save.**
3. Paste each block below into its own cell and run them top to bottom (▶).

### Cell 1 — confirm the free GPU
```python
!nvidia-smi --query-gpu=name,memory.total --format=csv
```

### Cell 2 — install ComfyUI
```python
!git clone https://github.com/comfyanonymous/ComfyUI
!pip -q install -r ComfyUI/requirements.txt
```

### Cell 3 — download checkpoints (pick ONE; all free, all open)
```python
# Quality (works great on the T4): Juggernaut XL
!wget -q -O ComfyUI/models/checkpoints/juggernautXL.safetensors \
  https://huggingface.co/RunDiffusion/Juggernaut-XL-v9/resolve/main/Juggernaut-XL_v9_RunDiffusionPhoto_v2.safetensors
# (Alternative fast one: SDXL Turbo — smaller, 1-4 steps)
# !wget -q -O ComfyUI/models/checkpoints/sd_xl_turbo.safetensors \
#   https://huggingface.co/stabilityai/sdxl-turbo/resolve/main/sd_xl_turbo_1.0_fp16.safetensors
```

### Cell 4 — start ComfyUI + a free public tunnel
```python
import subprocess, threading, time, re, urllib.request, os
# start ComfyUI
threading.Thread(target=lambda: subprocess.run(
  ["python","ComfyUI/main.py","--listen","127.0.0.1","--port","8188"]), daemon=True).start()
# cloudflared tunnel
urllib.request.urlretrieve(
  "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64","cloudflared")
os.chmod("cloudflared",0o755)
p = subprocess.Popen(["./cloudflared","tunnel","--url","http://127.0.0.1:8188"],
                     stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
for line in p.stdout:
    m = re.search(r"https://[-a-z0-9]+\.trycloudflare\.com", line)
    if m:
        print("\n\n=== COPY THIS URL AND SEND IT TO CLAUDE ===\n" + m.group(0) + "\n")
        break
```

4. Cell 4 prints a URL like `https://xxxx-yyyy.trycloudflare.com`.
   **Copy that URL and paste it to me.** Keep the Colab tab open (closing it kills the GPU).

---

## What I do with the URL
- Set `COMFYUI_HOST=<your trycloudflare url>` in `.env` (git-ignored).
- `npm run doctor` → ComfyUI **UP** (now on the free T4).
- `npm run generate:comfy <ASSET_ID> --ckpt juggernautXL.safetensors` → **free, GPU-fast** generation
  (≈10–20s/image), stored + versioned by the pipeline exactly like the cloud assets.
- We then batch the ~80 forgiving Family-A/C assets (kolam, borders, textures, icons) for free,
  and any hero shots you want, without spending a cent.

---
*Free GPU path v1 · run the notebook, send me the tunnel URL, and we generate for free.*
