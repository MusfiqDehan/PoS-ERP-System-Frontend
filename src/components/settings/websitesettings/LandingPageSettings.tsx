"use client";
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useRef, useState } from "react";
import {
  fetchTenantLandingSettings,
  removeLandingHero,
  updateTenantLandingSettings,
  uploadLandingHero,
  type TenantLandingSettings,
} from "@/lib/tenant-landing-settings";
import type { LandingFooterLink, LandingHighlight } from "@/lib/tenant-landing";
import { normalizeTenantLandingSettings } from "@/lib/tenant-landing";
import { getAccessToken } from "@/lib/auth-session";

const SOCIAL_KEYS = [
  "facebook",
  "instagram",
  "twitter",
  "linkedin",
  "youtube",
  "tiktok",
] as const;

const emptyHighlight = (): LandingHighlight => ({ title: "", description: "" });
const emptyFooterLink = (): LandingFooterLink => ({ label: "", url: "" });

export default function LandingPageSettings() {
  const token = getAccessToken();
  const [settings, setSettings] = useState<TenantLandingSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [heroUploading, setHeroUploading] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const heroInputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    const result = await fetchTenantLandingSettings(token);
    if (result.ok && result.body.success && result.body.data) {
      setSettings(normalizeTenantLandingSettings(result.body.data));
    } else {
      setFeedback({
        type: "error",
        message: result.body.message || "Failed to load landing settings.",
      });
    }
    setLoading(false);
  }, [token]);

  useEffect(() => {
    void load();
  }, [load]);

  if (loading) {
    return <p className="text-[#646B72]">Loading landing settings…</p>;
  }

  if (!settings?.landing_page_enabled) {
    return (
      <div className="rounded-md border border-[#eef0f3] bg-[#f8f9fa] p-4 text-[14px] text-[#646B72]">
        Public landing page is not enabled for your company. Contact your platform
        administrator to enable this feature.
      </div>
    );
  }

  const page = settings.landing_page;

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!token || !settings) return;
    setSaving(true);
    setFeedback(null);
    const result = await updateTenantLandingSettings(page, token);
    setSaving(false);
    if (result.ok && result.body.success && result.body.data) {
      setSettings(normalizeTenantLandingSettings(result.body.data));
      setFeedback({ type: "success", message: "Landing page settings saved." });
    } else {
      setFeedback({
        type: "error",
        message: result.body.message || "Failed to save landing settings.",
      });
    }
  }

  async function handleHeroChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !token) return;
    setHeroUploading(true);
    setFeedback(null);
    const result = await uploadLandingHero(file, token);
    setHeroUploading(false);
    if (result.ok && result.body.success) {
      await load();
      setFeedback({ type: "success", message: "Hero image updated." });
    } else {
      setFeedback({
        type: "error",
        message: result.body.message || "Failed to upload hero image.",
      });
    }
    if (heroInputRef.current) heroInputRef.current.value = "";
  }

  async function handleRemoveHero() {
    if (!token || !settings?.hero_image) return;
    if (!confirm("Remove the landing hero image?")) return;
    const result = await removeLandingHero(token);
    if (result.ok && result.body.success) {
      await load();
      setFeedback({ type: "success", message: "Hero image removed." });
    }
  }

  function updatePage<K extends keyof typeof page>(key: K, value: (typeof page)[K]) {
    setSettings((prev) =>
      prev
        ? {
            ...prev,
            landing_page: { ...prev.landing_page, [key]: value },
          }
        : prev,
    );
  }

  return (
    <div className="card border border-[#eef0f3] rounded-lg mt-4">
      <div className="card-header border-b border-[#eef0f3] px-4 py-3">
        <h5 className="m-0 text-[16px] font-semibold text-[#212B36]">
          Public Landing Page
        </h5>
        <p className="m-0 mt-1 text-[13px] text-[#646B72]">
          Customize the page visitors see at your company subdomain root URL.
        </p>
      </div>
      <div className="card-body p-4">
        {feedback ? (
          <div
            className={`mb-3 p-3 rounded text-[13px] ${
              feedback.type === "success"
                ? "bg-[#E7FBF7] text-[#0ac79e]"
                : "bg-[#fff0f0] text-[#c80000]"
            }`}
          >
            {feedback.message}
          </div>
        ) : null}

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="form-label">Hero image</label>
            <div className="flex items-center gap-3 flex-wrap">
              {settings.hero_image?.url ? (
                <img
                  src={settings.hero_image.url}
                  alt="Landing hero"
                  className="w-40 h-24 object-cover rounded border border-[#eef0f3]"
                />
              ) : (
                <div className="w-40 h-24 rounded border border-dashed border-[#d0d5dd] flex items-center justify-center text-[12px] text-[#98A2B3]">
                  No hero image
                </div>
              )}
              <div className="flex gap-2">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => heroInputRef.current?.click()}
                  disabled={heroUploading}
                >
                  {heroUploading ? "Uploading…" : "Upload hero"}
                </button>
                {settings.hero_image ? (
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => void handleRemoveHero()}
                  >
                    Remove
                  </button>
                ) : null}
              </div>
              <input
                ref={heroInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => void handleHeroChange(e)}
              />
            </div>
          </div>

          <div>
            <label className="form-label" htmlFor="landing-headline">
              Headline
            </label>
            <input
              id="landing-headline"
              className="form-control"
              value={page.headline}
              onChange={(e) => updatePage("headline", e.target.value)}
            />
          </div>

          <div>
            <label className="form-label" htmlFor="landing-description">
              Description
            </label>
            <textarea
              id="landing-description"
              className="form-control"
              rows={4}
              value={page.description}
              onChange={(e) => updatePage("description", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="form-label">Primary CTA label</label>
              <input
                className="form-control"
                value={page.primary_cta.label}
                onChange={(e) =>
                  updatePage("primary_cta", {
                    ...page.primary_cta,
                    label: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="form-label">Primary CTA URL</label>
              <input
                className="form-control"
                value={page.primary_cta.url}
                onChange={(e) =>
                  updatePage("primary_cta", {
                    ...page.primary_cta,
                    url: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="form-label">Secondary CTA label</label>
              <input
                className="form-control"
                value={page.secondary_cta?.label || ""}
                onChange={(e) =>
                  updatePage("secondary_cta", {
                    label: e.target.value,
                    url: page.secondary_cta?.url || "",
                  })
                }
              />
            </div>
            <div>
              <label className="form-label">Secondary CTA URL</label>
              <input
                className="form-control"
                value={page.secondary_cta?.url || ""}
                onChange={(e) =>
                  updatePage("secondary_cta", {
                    label: page.secondary_cta?.label || "",
                    url: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="form-label m-0">Feature highlights</label>
              <button
                type="button"
                className="btn btn-sm btn-outline-primary"
                onClick={() =>
                  updatePage("feature_highlights", [
                    ...page.feature_highlights,
                    emptyHighlight(),
                  ])
                }
              >
                Add highlight
              </button>
            </div>
            {page.feature_highlights.map((item, index) => (
              <div
                key={`highlight-${index}`}
                className="border border-[#eef0f3] rounded p-3 mb-2"
              >
                <input
                  className="form-control mb-2"
                  placeholder="Title"
                  value={item.title}
                  onChange={(e) => {
                    const next = [...page.feature_highlights];
                    next[index] = { ...item, title: e.target.value };
                    updatePage("feature_highlights", next);
                  }}
                />
                <textarea
                  className="form-control"
                  rows={2}
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => {
                    const next = [...page.feature_highlights];
                    next[index] = { ...item, description: e.target.value };
                    updatePage("feature_highlights", next);
                  }}
                />
                <button
                  type="button"
                  className="btn btn-sm btn-link text-danger mt-1 p-0"
                  onClick={() => {
                    const next = page.feature_highlights.filter((_, i) => i !== index);
                    updatePage("feature_highlights", next);
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div>
            <label className="form-label">Social links</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {SOCIAL_KEYS.map((key) => (
                <div key={key}>
                  <label className="form-label text-capitalize text-[12px]">
                    {key}
                  </label>
                  <input
                    className="form-control"
                    placeholder={`https://${key}.com/...`}
                    value={page.social_links[key] || ""}
                    onChange={(e) =>
                      updatePage("social_links", {
                        ...page.social_links,
                        [key]: e.target.value,
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="form-label m-0">Footer links</label>
              <button
                type="button"
                className="btn btn-sm btn-outline-primary"
                onClick={() =>
                  updatePage("footer_links", [...page.footer_links, emptyFooterLink()])
                }
              >
                Add link
              </button>
            </div>
            {page.footer_links.map((link, index) => (
              <div
                key={`footer-${index}`}
                className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2"
              >
                <input
                  className="form-control"
                  placeholder="Label"
                  value={link.label}
                  onChange={(e) => {
                    const next = [...page.footer_links];
                    next[index] = { ...link, label: e.target.value };
                    updatePage("footer_links", next);
                  }}
                />
                <div className="flex gap-2">
                  <input
                    className="form-control"
                    placeholder="URL"
                    value={link.url}
                    onChange={(e) => {
                      const next = [...page.footer_links];
                      next[index] = { ...link, url: e.target.value };
                      updatePage("footer_links", next);
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => {
                      const next = page.footer_links.filter((_, i) => i !== index);
                      updatePage("footer_links", next);
                    }}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Saving…" : "Save landing page"}
          </button>
        </form>
      </div>
    </div>
  );
}
